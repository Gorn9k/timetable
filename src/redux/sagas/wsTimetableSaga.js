import {call, cancelled, fork, put, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {addTeacherSchedule, editTeacherSchedule, removeTeacherSchedule} from "../slices/teacherScheduleSlice";
import {addGroupSchedule, editGroupSchedule, removeGroupSchedule} from "../slices/groupScheduleSlice";

const CONNECT = 'CONNECT';
const DISCONNECT = 'DISCONNECT';
const TAKE_MESSAGE = 'TAKE_MESSAGE';
const START_WEBSOCKET = 'START_WEBSOCKET';
const STOP_WEBSOCKET = 'STOP_WEBSOCKET';
const ERROR = 'ERROR';

const createWebSocketChannel = (url) => {
    return eventChannel((emit) => {
        const client = new Client({
            // webSocketFactory: () => {
            //     return new SockJS(`${url}?token=${JSON.parse(localStorage.getItem('user')).access_token}`);
            // },
            // connectHeaders: {
            //     Authorization: 'Bearer ' +
            // },
            brokerURL: `${url}?token=${JSON.parse(localStorage.getItem('user')).access_token}`,
            //reconnectDelay: 1000000000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                //emit({ type: CONNECT });
                client.subscribe('/topic/schedule/updates', (message) => {
                    const payload = JSON.parse(message.body);
                    console.log('Received message:', payload);
                    emit({ type: TAKE_MESSAGE, payload });
                });
            },
            onDisconnect: () => {
                console.log('Disconnected from WebSocket');
                emit({ type: DISCONNECT });
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                emit({ type: ERROR });
            },
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    });
};

function* watchWebSocket(url) {
    const channel = yield call(createWebSocketChannel, url);
    try {
        while (true) {
            const action = (yield take(channel))
            console.log(action)
            switch (action.type) {
                case TAKE_MESSAGE:
                    switch (action.payload && action.payload.packetType) {
                        case 'CREATE':
                            console.log(action.payload.payload)
                            const teacherLesson = {
                                id: action.payload.payload.id,
                                lessonDay: action.payload.payload.day,
                                lessonNumber: action.payload.payload.lessonNumber,
                                typeClassName: action.payload.payload.lessonType,
                                disciplineName: action.payload.payload.disciplineName,
                                subGroup: action.payload.payload.subGroup,
                                weekNumber: action.payload.payload.weekType,
                                numerator: action.payload.payload.weekType,
                                frame: action.payload.payload.frame,
                                location: action.payload.payload.roomNumber,
                                groupName: action.payload.payload.group,
                            }
                            const groupLesson = {
                                id: action.payload.payload.id,
                                lessonDay: action.payload.payload.day,
                                lessonNumber: action.payload.payload.lessonNumber,
                                typeClassName: action.payload.payload.lessonType,
                                disciplineName: action.payload.payload.disciplineName,
                                subGroup: action.payload.payload.subGroup,
                                weekNumber: action.payload.payload.weekType,
                                numerator: action.payload.payload.weekType,
                                frame: action.payload.payload.frame,
                                location: action.payload.payload.roomNumber,
                                teacherFio: action.payload.payload.teacherFullName
                            }
                            yield put(addTeacherSchedule(teacherLesson))
                            yield put(addGroupSchedule(groupLesson))
                            break
                        case 'UPDATE': {
                            const teacherLesson = {
                                id: action.payload.payload.id,
                                lessonDay: action.payload.payload.day,
                                typeClassName: action.payload.payload.lessonType,
                                disciplineName: action.payload.payload.disciplineName,
                                subGroup: action.payload.payload.subGroup,
                                weekNumber: action.payload.payload.weekType,
                                numerator: action.payload.payload.weekType,
                                frame: action.payload.payload.frame,
                                location: action.payload.payload.roomNumber,
                                groupName: action.payload.payload.group,
                            }
                            const groupLesson = {
                                id: action.payload.payload.id,
                                lessonDay: action.payload.payload.day,
                                typeClassName: action.payload.payload.lessonType,
                                disciplineName: action.payload.payload.disciplineName,
                                subGroup: action.payload.payload.subGroup,
                                weekNumber: action.payload.payload.weekType,
                                numerator: action.payload.payload.weekType,
                                frame: action.payload.payload.frame,
                                location: action.payload.payload.roomNumber,
                                teacherFio: action.payload.payload.teacherFullName
                            }
                            yield put(editTeacherSchedule(teacherLesson))
                            yield put(editGroupSchedule(groupLesson))
                            break
                            }
                        case 'delete-load-info':
                            yield put(removeTeacherSchedule(action.payload.payload.id))
                            yield put(removeGroupSchedule(action.payload.payload.id))
                            break
                        default:
                            break;
                    }
                    break
                case ERROR:
                    break
                case DISCONNECT:
                    break
            }
        }
    } finally {
        if (yield cancelled()) {
            channel.close();
        }
    }
}

export function* wsTimetableSaga() {
    yield fork(function* () {
        const url = 'ws://localhost:18088/ws';
        yield fork(watchWebSocket, url);
    });
}