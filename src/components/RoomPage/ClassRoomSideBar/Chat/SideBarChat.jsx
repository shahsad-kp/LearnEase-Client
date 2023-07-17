import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {IoSendOutline} from "react-icons/io5";
import {setMessages} from "../../../../redux/classRoomSlice/classRoomSlice.js";
import {getAllMessages} from "../../../../service/api/messages.js";
import {imageBaseURL} from "../../../../service/api/apiConfiguration.js";
import {messageSocketContext} from "../../../../service/sockets/MessageSocket.jsx";

export const SideBarChat = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const user = useSelector(state => state.auth.user);
    const dispatcher = useDispatch();
    const {sendMessageToServer} = useContext(messageSocketContext);
    const [message, setMessage] = useState('');
    const messagesRef = useRef(null);

    useEffect(() => {
        if (classRoom) {

            if (classRoom.messages === undefined) {
                getAllMessages({roomId: classRoom.id}).then(messages =>
                    dispatcher(setMessages(messages)));
            }
        }
    }, []);

    const messages = useMemo(() => {
        if (!classRoom) {
            return [];
        }
        if (!classRoom.messages) {
            return [];
        }
        return classRoom.messages.map(
            message => {
                return {
                    ...message,
                    sender: {
                        ...message.sender,
                        isSelf: message.sender.id === user.id
                    }
                }
            }
        );
    }, [classRoom, user.id])

    useEffect(() => {
        if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if (!message.trim()) return;
        sendMessageToServer({message});
        setMessage('');
    }

    if (!messages) return <div/>;

    return (
        <div className={'gap-4 p-2 flex flex-col h-full'}>
            <div className={'gap-2 p-3 bg-primary h-full flex flex-col rounded-sm w-full'}>
                <div className={'overflow-y-scroll w-full h-full'} ref={messagesRef}>
                    {
                        messages.map((message, index) => {
                            return (<div
                                key={index}
                                className={`flex flex-col gap-1 
                                w-full${message.sender.isSelf ? ' items-end' : ' justify-start'}`}
                            >
                                <span className={'text-[10px]'}>{message.sender.name}</span>
                                <div
                                    className={`flex items-center gap-2 
                                    ${message.sender.isSelf ? 'flex-row-reverse' : 'flex-row'}`
                                    }>
                                    <img
                                        src={`${imageBaseURL}${message.sender.profilePicture}`}
                                        alt={''}
                                        className={'object-cover w-8 h-8 rounded-full'}
                                    />
                                    <div className={'flex flex-col gap-1'}>
                                        <span
                                            className={
                                                `px-2 py-1 rounded-full text-[10px]]${
                                                    message.sender.isSelf ? 
                                                        ' bg-white white-black' : ' bg-logo-green text-white'
                                                }`
                                            }
                                        >
                                            {message.text}
                                        </span>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>
                <form className={'bg-secondary w-full p-2 h-fit flex flex-row justify-end rounded'}>
                    <input
                        className={'w-full outline-0 text-[10px]'}
                        placeholder={'Enter message..'}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                    />
                    <button
                        className={'w-6 h-6 rounded bg-accent-color-one justify-center items-center flex'}
                        type={'submit'}
                        onClick={sendMessage}
                    >
                        <IoSendOutline/>
                    </button>
                </form>
            </div>
        </div>
    )
}