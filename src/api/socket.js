import {connectToRoom, disconnectRoom} from "./classRoom.js";
import {connectMessage, disconnectMessage} from "./messages.js";
import {connectDocument, disconnectDocument} from "./documents.js";
import {connectWhiteboard, disconnectWhiteboard} from "./whiteboard.js";
import {connectActivities, disconnectActivities} from "./activities.js";

const wsBaseUrl = 'ws://localhost:8000/ws/'

const connectAllSockets = ({roomId}) => {
    connectToRoom(roomId);
    connectMessage(roomId);
    connectDocument(roomId);
    connectWhiteboard(roomId);
    connectActivities(roomId);
}

const disconnectAllSockets = () => {
    disconnectRoom();
    disconnectMessage();
    disconnectDocument();
    disconnectWhiteboard();
    disconnectActivities();
}

const connectWebSocket = (endpoint, {onOpen, onMessage, onError, onClose}) => {
    const token = localStorage.getItem('accessToken'); // Retrieve token from localStorage
    let url;
    if (token) {
        url = `${wsBaseUrl}${endpoint}?token=${token}`;
    } else {
        url = `${wsBaseUrl}${endpoint}?token=${token}`;
    }

    const socket = new WebSocket(url);

    socket.onopen = onOpen;

    socket.onmessage = onMessage;

    socket.onerror = onError;

    socket.onclose = onClose();

    return socket;
};

export {
    connectWebSocket,
    connectMessage,
    connectAllSockets,
    disconnectAllSockets
};