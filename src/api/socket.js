import {
    addActivity,
    addDocument,
    addMessage,
    addParticipant, addResponse,
    changeParticipantSettings,
    removeParticipant
} from "../redux/classRoomSlice/classRoomSlice.js";
import store from "../redux/store.js";
import {addLine} from "../redux/whiteboardSlice/whiteboardSlice.js";

const wsBaseUrl = 'ws://localhost:8000/ws/'
let roomSocket = null;
let messageSocket = null;
let documentSocket = null;
let whiteboardSocket = null;
let activitySocket = null;

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
    const endPoint = `messages/${roomId}/`;
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

    messageSocket = connectWebSocket(endPoint, {onOpen, onMessage, onError, onClose });
}

const disconnectMessage = () => {
    if (messageSocket) {
        messageSocket.close();
    }
}

const connectDocument = (roomId) => {
    const onOpen = () => {
        console.log('connected to document');
    };
    const onMessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.document){
            const document = data.document;
            
            store.dispatch(addDocument(document));
        }
    };
    const onError = (e) => {
        console.log('error', e);
    }
    const onClose = () => {
        console.log('disconnected from room');
    }
    const endPoint = `documents/${roomId}/`;

    documentSocket = connectWebSocket(endPoint, {onOpen, onMessage, onError, onClose});
}

const disconnectDocument = () => {
    if (documentSocket) {
        documentSocket.close();
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

const connectActivities = (roomId) => {
    const onOpen = () => {
        console.log('connected to activities');
    };
    const onMessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'new_activity'){
            store.dispatch(addActivity(data.activity))
        }
        else if (data.type === 'new_response'){
            console.log(data.response)
            store.dispatch(addResponse(data.response))
        }
    };
    const onError = (e) => {
        console.log('error', e);
    }
    const onClose = () => {
        console.log('disconnected from room');

    }
    const endPoint = `activities/${roomId}/`;

    activitySocket = connectWebSocket(endPoint, {onOpen, onMessage, onError, onClose});
}

const disconnectActivities = () => {
    if (activitySocket){
        activitySocket.close();
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

const sendDocumentToServer = ({document}) => {
    const data = {
        type: 'send_document',
        document
    }
    documentSocket.send(JSON.stringify(data));
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

const sendNewActivityToServer = (activityData) => {
    if (activitySocket){
        const data = {
            type: 'new_activity',
            activity: activityData
        }
        activitySocket.send(JSON.stringify(data))
    }
}

const addResponseToServer = ({optionId, activityId}) => {
    if (activitySocket){
        const data = {
            type: 'new_response',
            data: {
                activityId,
                optionId
            }
        }
        console.log(data, 'sending data')
        activitySocket.send(JSON.stringify(data))
    }
}

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
    connectToRoom,
    disconnectRoom,
    changeSettings,
    changePermission,
    connectMessage,
    sendMessageToServer,
    sendDocumentToServer,
    sendWhiteboardToServer,
    sendLineToServer,
    sendClearToServer,
    sendNewActivityToServer,
    addResponseToServer,
    connectAllSockets,
    disconnectAllSockets
};