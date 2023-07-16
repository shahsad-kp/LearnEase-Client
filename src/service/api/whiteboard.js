import {axiosAuthorized} from "./apiConfiguration.js";

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

export {
    getWhiteboard
}
