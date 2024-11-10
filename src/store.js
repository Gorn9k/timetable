import thunkMiddleware from "redux-thunk";
import mainReducer from "./redux/reducers/mainReducer";
import loadReducer, {setGroupName, setTeacherFio} from './redux/slices/loadSlice'
import {configureStore, combineReducers} from "@reduxjs/toolkit";

export const broadcastChannel = new BroadcastChannel('redux_state_sync');

const rootReducer = combineReducers({
    mainPage: mainReducer,
    loadPage: loadReducer
});

const syncedActions = new Set();

const syncStateMiddleware = () => (next) => (action) => {
    console.log(action)
    const currentType = [setTeacherFio.type, setGroupName.type].some(type =>
        type === action.type) ? action.type : null
    if (currentType && !syncedActions.has(currentType)) {
        broadcastChannel.postMessage({
            type: currentType, state: action.payload,
        });
    }

    syncedActions.delete(action.type);

    return next(action);
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(syncStateMiddleware).concat(thunkMiddleware)
});

broadcastChannel.onmessage = (event) => {
    const {type, state} = event.data;

    syncedActions.add(type);
    store.dispatch({type: type, payload: state});
};
