import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useRef, useState} from "react";
import {IoCloseOutline, IoDocumentOutline, IoDownloadOutline} from "react-icons/io5";
import {addDocument, setDocuments} from "../../../../redux/classRoomSlice/classRoomSlice.js";
import {AiOutlineUpload} from "react-icons/ai";

export const SideBarDocuments = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const dispatcher = useDispatch();
    const [document, setDocument] = useState(null);
    const documentsRef = useRef(null);
    const documentSelectRef = useRef(null);

    useEffect(() => {
        if (classRoom) {
            if (classRoom.documents === null) {
                // TODO: take messages from server

                const documents = [
                    {
                        'id': 1,
						'name': 'Document 1',
						'link': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					{
						'id': 2,
						'name': 'Document 2',
						'link': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
                    },
					{
						'id': 3,
						'name': 'Document 3',
						'link': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
					{
						'id': 4,
						'name': 'Document 4',
						'link': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
					},
                    {
                        'id': 5,
                        'name': 'Document 5',
                        'link': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
                    },
                    {
                        'id': 6,
                        'name': 'Document 6',
                        'link': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
                    },
                    {
                        'id': 7,
                        'name': 'Document 7',
                        'link': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
                    },
                    {
                        'id': 8,
                        'name': 'Document 8',
                        'link': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
                    },
                    {
                        'id': 9,
                        'name': 'Document 9',
                        'link': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
                    },
                    {
                        'id': 10,
                        'name': 'Document 10',
                        'link': 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
                    }
                ]
                dispatcher(setDocuments(documents));
            }
        }
    }, [classRoom, dispatcher]);

    const takeUserData = useCallback(() => {
        if (!classRoom) {
            return {documents: [], userData: {}, isLecturer: false};
        }
        let userData, documents = classRoom.documents;
        if (classRoom.isLecturer) {
            userData = {
                id: classRoom.lecturer.id,
                name: classRoom.lecturer.name,
                profilePicture: classRoom.lecturer.profilePicture,
            }
        }
        else {
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

        return {documents, userData, isLecturer: classRoom.isLecturer};
    }, [classRoom])

    const {documents, isLecturer} = takeUserData();

    useEffect(() => {
        if (documentsRef.current) documentsRef.current.scrollTop = documentsRef.current.scrollHeight;
    }, [documents]);

    const uploadDocument = (event) => {
        event.preventDefault();
        if (!document) return;
        // TODO: send message to server

        const documentData = {
            id: documents.length + 1,
            name: document.name,
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        }

        dispatcher(addDocument(documentData));
        setDocument(null);
    }

    if (!documents) return <div/>;

    return (
        <div className={'gap-4 p-2 flex flex-col h-full'}>
            <div className={'gap-2 p-3 bg-primary h-full flex flex-col rounded-sm w-full'}>
                <div className={'overflow-y-scroll w-full gap-3 flex flex-col h-full'} ref={documentsRef}>
                    {
                        documents.map((document, index) => {
                            return (<div key={index} className={'flex flex-row justify-between w-full'}>
                                <div className={'flex flex-row gap-1 items-center'}>
                                    <IoDocumentOutline/>
                                    <span className={'text-[16px] font-semibold'}>{document.name}</span>
                                </div>
                                <IoDownloadOutline/>
                            </div>)
                        })
                    }
                </div>
                {isLecturer && <form className={'bg-secondary w-full h-fit flex flex-row justify-between rounded gap-2'}>
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
                                uploadDocument(event)
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