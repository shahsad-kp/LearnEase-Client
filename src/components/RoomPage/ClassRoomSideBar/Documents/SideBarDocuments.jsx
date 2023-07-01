import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useRef, useState} from "react";
import {IoCloseOutline, IoDocumentOutline, IoDownloadOutline} from "react-icons/io5";
import {setDocuments} from "../../../../redux/classRoomSlice/classRoomSlice.js";
import {AiOutlineUpload} from "react-icons/ai";
import {getAllDocuments, uploadDocument} from "../../../../api/documents.js";
import axios from "axios";
import fileDownload from "js-file-download";
import {sendDocumentToServer} from "../../../../api/socket.js";

export const SideBarDocuments = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const user = useSelector(state => state.auth.user);
    const dispatcher = useDispatch();
    const [document, setDocument] = useState(null);
    const documentsRef = useRef(null);
    const documentSelectRef = useRef(null);

    useEffect(() => {
        if (classRoom) {
            if (classRoom.documents === undefined) {
                getAllDocuments({roomId: classRoom.id}).then((documents) => {
                    dispatcher(setDocuments(documents));
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }, [classRoom, dispatcher]);

    const takeUserData = useCallback(() => {
        if (!classRoom) {
            return {documents: [], userData: {}, isLecturer: false};
        }
        let userData, documents = classRoom.documents;
        if (classRoom.lecturer.id === user.id) {
            userData = {
                id: classRoom.lecturer.id,
                name: classRoom.lecturer.name,
                profilePicture: classRoom.lecturer.profilePicture,
            }
        } else {
            for (let student of classRoom.students) {
                if (student.isSelf) {
                    userData = {
                        id: student.id,
                        name: student.name,
                        profilePicture: student.profilePicture,
                    }
                    break;
                }
            }
        }

        return {documents, userData, isLecturer: classRoom.lecturer.id === user.id};
    }, [classRoom])

    const {documents, isLecturer} = takeUserData();

    useEffect(() => {
        if (documentsRef.current) documentsRef.current.scrollTop = documentsRef.current.scrollHeight;
    }, [documents]);

    const handleDownload = (url, filename) => {
        
        axios.get(url, {
            responseType: 'blob',
        })
            .then((res) => {
                fileDownload(res.data, filename)
            })
    }

    const uploadDocumentHandler = (event) => {
        event.preventDefault();
        if (!document) return;
        const title = document.name;
        uploadDocument({roomId: classRoom.id, title, file: document}).then((response) => {
            sendDocumentToServer({document: response});
        }).catch((error) => {
            console.log(error);
        });
        setDocument(null);
    }

    if (!documents) return <div/>;

    return (
        <div className={'gap-4 p-2 flex flex-col h-full'}>
            <div className={'gap-2 p-3 bg-primary h-full flex flex-col rounded-sm w-full'}>
                <div className={'overflow-y-scroll w-full gap-3 flex flex-col h-full'} ref={documentsRef}>
                    {
                        documents.map((document, index) => {
                            return (
                                <div key={index} className={'flex flex-row justify-between items-center w-full'}>
                                    <div className={'flex flex-row gap-1 items-center'}>
                                        <IoDocumentOutline/>
                                        <span className={'text-[16px] font-semibold'}>{document.title}</span>
                                    </div>
                                    <IoDownloadOutline
                                        className={'cursor-pointer'}
                                        onClick={() => handleDownload(document.docfile, document.title)}
                                    />
                                </div>)
                        })
                    }
                </div>
                {isLecturer &&
                    <form className={'bg-secondary w-full h-fit flex flex-row justify-between rounded gap-2'}>
                        <input
                            className={'hidden'}
                            placeholder={'Enter message..'}
                            type={'file'}
                            onChange={(event) => setDocument(event.target.files[0])}
                            ref={documentSelectRef}
                        />
                        <button
                            className={'w-full h-10 rounded bg-accent-color-one gap-2.5 justify-center items-center flex'}
                            type={'button'}
                            onClick={(event) => {
                                event.preventDefault();
                                if (!document) {
                                    documentSelectRef.current.click();
                                } else {
                                    uploadDocumentHandler(event)
                                }
                            }}
                        >
                            {!document ? <IoDocumentOutline/> : <AiOutlineUpload/>}
                            <span>{document ? `Upload file` : 'Select File'}</span>
                        </button>
                        {
                            document &&
                            <button
                                className={'bg-dangerColor h-10 w-10 p-2 rounded justify-center items-center flex'}
                                onClick={() => {
                                    documentSelectRef.current.value = null;
                                    setDocument(null);
                                }}
                            >
                                <IoCloseOutline/>
                            </button>}
                    </form>}
            </div>
        </div>
    )
}