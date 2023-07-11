import {axiosAuthorized} from "./apiConfiguration.js";
import store from "../redux/store.js";
import {addMessage} from "../redux/classRoomSlice/classRoomSlice.js";
import {connectWebSocket} from "./socket.js";


let messageSocket = null;

const getAllMessages = async ({roomId}) => {
    try {
        const response = await axiosAuthorized.get(
            `/messages/${roomId}/`
        )
        return response.data
    } catch (e) {
        return await Promise.reject(e)
    }
}

const connectMessage = (roomId) => {
    const endPoint = `messages/${roomId}/`;
    const onOpen = () => {
        console.log('connected to message');
    };
    const onMessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.message) {
            const message = data.message;
            store.dispatch(addMessage(message));
        }
    };
    const onError = (e) => {
        console.log('error', e);
    }
    const onClose = () => {
        console.log('disconnected from room');
    }


    messageSocket = connectWebSocket(endPoint, {onOpen, onMessage, onError, onClose});
}

const disconnectMessage = () => {
    if (messageSocket) {
        messageSocket.close();
    }
}

const sendMessageToServer = ({message}) => {
    const data = {
        type: 'send_message',
        message
    }
    messageSocket.send(JSON.stringify(data));
}

export {
    getAllMessages,
    connectMessage,
    disconnectMessage,
    sendMessageToServer
}
