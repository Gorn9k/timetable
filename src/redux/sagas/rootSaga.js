import { all } from 'redux-saga/effects';
import {wsTimetableSaga} from "./wsTimetableSaga";
import {wsLoadSaga} from "./wsLoadSaga";

export default function* rootSaga() {
    yield all([
        wsTimetableSaga(),
        //wsLoadSaga()
    ]);
}