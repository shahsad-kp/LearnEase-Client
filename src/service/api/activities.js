import {axiosAuthorized} from "./apiConfiguration.js";

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

export {
    getAllActivities,
}