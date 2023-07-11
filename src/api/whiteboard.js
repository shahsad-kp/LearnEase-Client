import {axiosAuthorized} from "./apiConfiguration.js";
import store from "../redux/store.js";
import {addLine} from "../redux/whiteboardSlice/whiteboardSlice.js";
import {connectWebSocket} from "./socket.js";

let whiteboardSocket = null;

const getWhiteboard = async ({roomId}) => {
    try {
        const response = await axiosAuthorized.get(
            `/whiteboard/${roomId}/`
        )
        return response.data
    } catch (e) {
        return await Promise.reject(e)
    }
}

const connectWhiteboard = (roomId) => {
    const onOpen = () => {
        console.log('connected to whiteboard');
    };
    const onMessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'line'){
            const {line} = data;
            store.dispatch(
                addLine(line)
            );
        }
        else if (data.type === 'clear_data'){
            const line = {clear: true}
            store.dispatch(
                addLine(line)
            );
        }
    };
    const onError = (e) => {
        console.log('error', e);
    }
    const onClose = () => {
        console.log('disconnected from room');

    }
    const endPoint = `whiteboard/${roomId}/`;

    whiteboardSocket = connectWebSocket(endPoint, {onOpen, onMessage, onError, onClose});
}

const disconnectWhiteboard = () => {
    if (whiteboardSocket) {
        whiteboardSocket.close();
    }
}

const sendWhiteboardToServer = (new_data) => {
    const data = {
        type: 'new_data',
        data: new_data
    }
    whiteboardSocket.send(JSON.stringify(data));
}

const sendClearToServer = () => {
    const data = {
        type: 'clear_data'
    }
    whiteboardSocket.send(JSON.stringify(data));
}

const sendLineToServer = (line) => {
    const data = {
        type: 'new_line',
        line
    }
    whiteboardSocket.send(JSON.stringify(data));
}

export {
    connectWhiteboard,
    disconnectWhiteboard,
    getWhiteboard,
    sendWhiteboardToServer,
    sendClearToServer,
    sendLineToServer,
}
