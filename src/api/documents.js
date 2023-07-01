import {axiosAuthorized} from "./apiConfiguration.js";

const getAllDocuments = async ({roomId}) => {
    try {
        const response = await axiosAuthorized.get(
            `/documents/${roomId}/`
        )
        return response.data
    } catch (e) {
        return await Promise.reject(e)
    }
}

const uploadDocument = async ({roomId, title, file}) => {
    try {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('docfile', file)
        const response = await axiosAuthorized.post(
            `/documents/${roomId}/`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        const data = response.data
        return data

    } catch (e) {
        return await Promise.reject(e)
    }
}

export {getAllDocuments, uploadDocument}
