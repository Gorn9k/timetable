import {call, cancelled, fork, put, take} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const CONNECT = 'CONNECT';
const DISCONNECT = 'DISCONNECT';
const TAKE_MESSAGE = 'TAKE_MESSAGE';
const START_WEBSOCKET = 'START_WEBSOCKET';
const STOP_WEBSOCKET = 'STOP_WEBSOCKET';
const ERROR = 'ERROR';

const createWebSocketChannel = (url) => {
    return eventChannel((emit) => {
        const client = new Client({
            webSocketFactory: () => {
                return new SockJS(url);
            },
            // connectHeaders: {
            //     Authorization: 'Basic ' + btoa('admin:1a5Up59pE9sfzUO')
            // },
            brokerURL: url,
            //reconnectDelay: 1000000000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                //emit({ type: CONNECT });
                client.subscribe('/topic/loads-info', (message) => {
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
                    switch (action.payload && action.payload.type) {
                        case 'create-load-info':
                            //yield put(addLoadInfo(action.payload.payload))
                            break
                        case 'update-load-info':
                            //yield put(updateLoadInfo(action.payload.payload))
                            break
                        case 'delete-load-info':
                            //yield put(removeLoadInfo(action.payload.payload))
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

export function* wsLoadSaga() {
    yield fork(function* () {
        const url = 'http://localhost:8086/ws';
        yield fork(watchWebSocket, url);
    });
}