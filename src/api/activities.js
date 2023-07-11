import {axiosAuthorized} from "./apiConfiguration.js";
import store from "../redux/store.js";
import {addActivity, addResponse} from "../redux/classRoomSlice/classRoomSlice.js";
import {connectWebSocket} from "./socket.js";

let activitySocket = null;

const getAllActivities = async ({roomId}) => {
    try {
        const response = await axiosAuthorized.get(
            `/activities/${roomId}/`
        )
        return response.data
    } catch (e) {
        return await Promise.reject(e)
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

export {
    connectActivities,
    disconnectActivities,
    getAllActivities,
    sendNewActivityToServer,
    addResponseToServer
}