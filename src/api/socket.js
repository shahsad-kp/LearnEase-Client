import {
    addMessage,
    addParticipant,
    changeParticipantSettings,
    removeParticipant
} from "../redux/classRoomSlice/classRoomSlice.js";
import store from "../redux/store.js";

const wsBaseUrl = 'ws://localhost:8000/ws/'
let roomSocket = null;
let messageSocket = null

const connectToRoom = (roomId) => {
    const onOpen = () => {
        console.log('connected to room');
    };
    const onMessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'join_student') {
            const student = data.student;
            store.dispatch(addParticipant(student));
        } else if (data.type === 'leave_student') {
            const student_id = data.student_id;
            store.dispatch(removeParticipant(student_id));
        } else if (data.type === 'change_settings'){
            const userId = data.user_id;
            const settings = data.settings
            store.dispatch(changeParticipantSettings({userId, settings}));
        }
    };
    const onError = (e) => {
        console.log('error', e);
    }
    const onClose = () => {
        console.log('disconnected from room');
    }
    const endPoint = `classroom/${roomId}/`;

    roomSocket = connectWebSocket(endPoint, {onOpen, onMessage, onError, onClose});
};

const disconnectRoom = () => {
    if (roomSocket) {
        roomSocket.close();
    }
}

const connectMessage = (roomId) => {
    const onOpen = () => {
        console.log('connected to message');
    };
    const onMessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.message){
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
    const endPoint = `messages/${roomId}/`;

    messageSocket = connectWebSocket(endPoint, {onOpen, onMessage, onError, onClose});
}

const disconnectMessage = () => {
    if (messageSocket) {
        messageSocket.close();
    }
}

const changeSettings = ({audio, video}) => {
    const data = {
        type: 'change_settings',
        audio,
        video
    }
    roomSocket.send(JSON.stringify(data));
}

const changePermission = ({userId, permission}) => {
    const data = {
        type: 'change_permission',
        user_id: userId,
        permission
    }
    roomSocket.send(JSON.stringify(data));
}

const sendMessageToServer = ({message}) => {
    const data = {
        type: 'send_message',
        message
    }
    messageSocket.send(JSON.stringify(data));
}

const connectAllSockets = ({roomId}) => {
    connectToRoom(roomId);
    connectMessage(roomId);
}

const disconnectAllSockets = () => {
    disconnectRoom();
    disconnectMessage();
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

    socket.onclose = onClose;

    return socket;
};

export {
    connectToRoom,
    disconnectRoom,
    changeSettings,
    changePermission,
    connectMessage,
    sendMessageToServer,
    connectAllSockets,
    disconnectAllSockets
};