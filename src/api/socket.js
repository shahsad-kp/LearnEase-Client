import {addParticipant, removeParticipant} from "../redux/classRoomSlice/classRoomSlice.js";
import store from "../redux/store.js";

const wsBaseUrl = 'ws://localhost:8000/ws/'
let roomSocket = null;

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
            console.log('leave_student', student_id)
            store.dispatch(removeParticipant(student_id));
        } else {
            console.log(data);
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

const changeSettings = ({audio, video, whiteboard}) => {
    const data = {
        type: 'change_settings',
        audio,
        video,
        whiteboard
    }
    roomSocket.send(JSON.stringify(data));
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

export {connectToRoom, disconnectRoom};