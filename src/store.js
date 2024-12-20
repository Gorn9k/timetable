import thunkMiddleware from "redux-thunk";
import mainReducer from "./redux/reducers/mainReducer";
import teacherScheduleReducer from "./redux/slices/teacherScheduleSlice";
import groupScheduleReducer from "./redux/slices/groupScheduleSlice"
import roomReducer from "./redux/slices/roomSlice"
import loadReducer, {
    setIsCloseTimetable,
    setLaboratoryHours,
    setLectureHours,
    setPracticeHours
} from './redux/slices/loadSlice'
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./redux/sagas/rootSaga";

export const broadcastChannel = new BroadcastChannel('redux_state_sync');

const rootReducer = combineReducers({
    mainPage: mainReducer,
    loadPage: loadReducer,
    teacherSchedulePage: teacherScheduleReducer,
    groupSchedulePage: groupScheduleReducer,
    roomPage: roomReducer
});

const syncedActions = new Set();

const syncStateMiddleware = () => (next) => (action) => {
    const currentType = [
        setLectureHours.type,
        setPracticeHours.type,
        setLaboratoryHours.type,
        setIsCloseTimetable.type
    ].some(type =>
        type === action.type) ? action.type : null
    if (currentType && !syncedActions.has(currentType)) {
        broadcastChannel.postMessage({
            type: currentType, state: action.payload,
        });
    }

    syncedActions.delete(action.type);

    return next(action);
};

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
        .concat(sagaMiddleware)
        .concat(syncStateMiddleware)
        .concat(thunkMiddleware)
});

sagaMiddleware.run(rootSaga)

broadcastChannel.onmessage = (event) => {
    const {type, state} = event.data;

    syncedActions.add(type);
    store.dispatch({type: type, payload: state});
};