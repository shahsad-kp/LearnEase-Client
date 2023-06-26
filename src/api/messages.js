import {axiosAuthorized} from "./apiConfiguration.js";

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

export {getAllMessages}
