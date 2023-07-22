import {useDispatch, useSelector} from "react-redux";
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import {documentSocketContext} from "../../../../service/sockets/DocumentSocket.jsx";
import {getAllDocuments, uploadDocument} from "../../../../service/api/documents.js";
import {setDocuments} from "../../../../redux/classRoomSlice/classRoomSlice.js";
import axios from "axios";
import fileDownload from "js-file-download";
import {IoCloseOutline, IoDocumentOutline, IoDownloadOutline} from "react-icons/io5";
import {AiOutlineUpload} from "react-icons/ai";

export const DocumentsList = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const user = useSelector(state => state.auth.user);
    const dispatcher = useDispatch();
    const {sendDocumentToServer} = useContext(documentSocketContext)
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
    }, [classRoom, user])

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
        <div
            className={'flex flex-col h-full gap-2'}
        >
            <div className={'font-semibold text-black dark:text-white'}>Documents</div>
            <hr width={'100%'} className={'h-0.5 bg-secondary dark:bg-dark-secondary'}/>
            <div
                className={'flex flex-col gap-2 h-full overflow-y-auto'}
                ref={documentsRef}
            >
                {
                    documents.map((document, index) => (
                        <div
                            key={index}
                            className={'flex flex-row items-center gap-2'}
                        >
                            <div className={'flex flex-row gap-1 items-center'}>
                                <IoDocumentOutline className={'text-black dark:text-white'}/>
                                <span className={'text-[16px] font-semibold text-black dark:text-white'}>{document.title}</span>
                            </div>
                            <IoDownloadOutline
                                className={'cursor-pointer text-black dark:text-white'}
                                onClick={() => handleDownload(document.docfile, document.title)}
                            />
                        </div>
                    ))
                }
            </div>
            {
                isLecturer &&
                <form className={'w-full h-fit flex flex-row justify-between rounded gap-2'}>
                    <input
                        className={'hidden text-black dark:text-white'}
                        placeholder={'Enter message..'}
                        type={'file'}
                        onChange={(event) => setDocument(event.target.files[0])}
                        ref={documentSelectRef}
                    />
                    <button
                        className={
                            'w-full h-10 rounded bg-accent-color-one dark:bg-dark-accent-color-one gap-2.5 justify-center items-center flex'
                        }
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
                        {!document ? <IoDocumentOutline className={'text-black dark:text-white'}/> : <AiOutlineUpload className={'text-black dark:text-white'}/>}
                        <span className={'text-black dark:text-white'}>{document ? `Upload file` : 'Select File'}</span>
                    </button>
                    {
                        document &&
                        <button
                            className={'bg-danger-color dark:bg-dark-danger-color h-10 w-10 p-2 rounded justify-center items-center flex'}
                            onClick={() => {
                                documentSelectRef.current.value = null;
                                setDocument(null);
                            }}
                        >
                            <IoCloseOutline className={'text-black dark:text-white'}/>
                        </button>}
                </form>}
        </div>
    )
}