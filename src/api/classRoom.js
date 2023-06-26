import {axiosAuthorized} from "./apiConfiguration.js";

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
    console.log(roomId, 'roomId')
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

export {createClassRoom, getTopics, getClassRoomData, getHistory}
