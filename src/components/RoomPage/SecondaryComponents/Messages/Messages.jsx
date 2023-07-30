import {IoSend} from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux";
import {useContext, useEffect, useMemo, useRef, useState} from "react";
import {messageSocketContext} from "../../../../service/sockets/MessageSocket.jsx";
import {getAllMessages} from "../../../../service/api/messages.js";
import {setMessages} from "../../../../redux/classRoomSlice/classRoomSlice.js";

export const Messages = () => {
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
        <div className={'p-2 relative bg-primary dark:bg-dark-primary h-full gap-2 flex flex-col w-full'}>
            <div className={'w-full gap-2 flex h-min flex-col'}>
                <h3 className={'font-semibold text-black dark:text-white'}>Messages</h3>
                <hr width={'100%'} className={'border'}/>
            </div>
            <div className={'overflow-y-scroll overflow-x-hidden h-[calc(100vh-540px)] md:h-[calc(100vh-455px)] w-full'} ref={messagesRef}>
                <div className={'flex flex-col gap-2'}>
                    {
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex flex-col gap-1 w-full ${message.sender.isSelf ? 'items-end' : 'items-start'}`}
                            >
                                <span className={'font-thin'}>{message.sender.name}</span>
                                <div
                                    className={`flex w-full items-center gap-2 ${message.sender.isSelf? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <img
                                        src={message.sender.profilePicture}
                                        alt={''}
                                        className={'object-cover w-8 h-8 rounded-full'}
                                    />
                                    <div className={'flex flex-col'}>
                                        <span
                                            className={
                                                `px-2 py-1 w-full h-max overflow-x-hidden rounded ${
                                                    message.sender.isSelf ? 
                                                        ' bg-white dark:bg-black text-black dark:text-white' : ' bg-logo-green dark:bg-dark-logo-green text-white'
                                                }`
                                            }
                                        >
                                            {message.text}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <form className={'w-full h-min relative'}>
                <input
                    type={'text'}
                    placeholder={'Type a message'}
                    className={'w-full rounded shadow h-full p-2 bg-secondary dark:bg-dark-secondary focus:outline-0 text-black dark:text-white'}
                    onChange={(event) => setMessage(event.target.value)}
                    value={message}
                />
                <button
                    type={'submit'}
                    className={'text-logo-yellow dark:text-dark-logo-yellow absolute right-0 h-full p-1'}
                    onClick={sendMessage}
                >
                    <IoSend/>
                </button>
            </form>
        </div>
    )
}