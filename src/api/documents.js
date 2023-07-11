import {axiosAuthorized} from "./apiConfiguration.js";
import store from "../redux/store.js";
import {addDocument} from "../redux/classRoomSlice/classRoomSlice.js";
import {connectWebSocket} from "./socket.js";

let documentSocket = null;

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
        return response.data

    } catch (e) {
        return await Promise.reject(e)
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

const sendDocumentToServer = ({document}) => {
    const data = {
        type: 'send_document',
        document
    }
    documentSocket.send(JSON.stringify(data));
}

export {
    connectDocument,
    disconnectDocument,
    getAllDocuments,
    uploadDocument,
    sendDocumentToServer,
}
