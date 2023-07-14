import {axiosAuthorized} from "./apiConfiguration.js";
import store from "../redux/store.js";
import {
    addParticipant,
    changeParticipantSettings,
    removeParticipant
} from "../redux/classRoomSlice/classRoomSlice.js";
import {connectWebSocket} from "./socket.js";

let roomSocket = null;

const createClassRoom = async ({title, topics}) => {
    try {
        const response = await axiosAuthorized.post(
            '/classroom/create/',
            {
                title,
                topics
            }
        )
        return response.data
    } catch (e) {
        return await Promise.reject(e)
    }
}

const getClassRoomData = async ({roomId}) => {
    
    try {
        const response = await axiosAuthorized.get(
            `/classroom/${roomId}/`
        )
        return response.data
    } catch (e) {
        return await Promise.reject(e)
    }
}

const getTopics = async ({classRoomId}) => {
    try {
        const response = await axiosAuthorized.get(
            `/classroom/topics/${classRoomId}/`
        )
        return response.data
    }
    catch (e) {
        return await Promise.reject(e)
    }
}

const getHistory = async () => {
    try {
        const response = await axiosAuthorized.get(
            `/classroom/history/`
        )
        return response.data
    }
    catch (e) {
        return await Promise.reject(e)
    }
}

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

const sendOffers = ({offers}) => {
    const data = {
        type: 'offers',
        offers
    }
    videoCallSocket.send(JSON.stringify(data));

}

const sendOffer = ({offer, to}) => {
    console.log('sending offer')
    const data = {
        type: 'offer',
        offer,
        to
    }
    roomSocket.send(JSON.stringify(data));
}

const sendAnswer = ({answer, to}) => {
    const data = {
        type: 'answer',
        answer,
        to
    }
    roomSocket.send(JSON.stringify(data));
}

const sendIceCandidate = ({candidate, to}) => {
    const data = {
        type: 'ice_candidate',
        candidate,
        to
    }
    roomSocket.send(JSON.stringify(data));
}

export {
    connectToRoom,
    disconnectRoom,
    createClassRoom,
    getTopics,
    getClassRoomData,
    getHistory,
    changeSettings,
    changePermission,
    sendOffer,
    sendAnswer,
    sendIceCandidate,
    sendOffers,
}
