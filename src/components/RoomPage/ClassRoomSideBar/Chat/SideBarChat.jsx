import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useRef, useState} from "react";
import {IoSendOutline} from "react-icons/io5";
import {addMessage, setMessages} from "../../../../redux/classRoomSlice/classRoomSlice.js";

export const SideBarChat = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const dispatcher = useDispatch();
    const [message, setMessage] = useState('');
    const messagesRef = useRef(null);

    useEffect(() => {
        if (classRoom) {
            if (classRoom.messages === null) {
                // TODO: take messages from server

                const messages = [
                    {
                        text: 'Hello Good Morning',
                        sender: {
                            id: 1,
                            name: 'Emma Smith',
                            profilePicture: 'https://example.com/profiles/1.jpg',
                            isSelf: true
                        }
                    },
                    {
                        text: 'Good Morning',
                        sender: {
                            id: 3,
                            name: 'Olivia Brown',
                            profilePicture: 'https://example.com/profiles/2.jpg',
                            isSelf: false
                        }
                    },
                    {
                        text: 'How are you?',
                        sender: {
                            id: 1,
                            name: 'Emma Smith',
                            profilePicture: 'https://example.com/profiles/1.jpg',
                            isSelf: true
                        }
                    },
                    {
                        text: "Can we start the class?",
                        sender: {
                            id: 7,
                            name: 'Ava Anderson',
                            profilePicture: 'https://example.com/profiles/3.jpg',
                            isSelf: false,
                        }
                    },
                    {
                        text: 'Hello Good Morning',
                        sender: {
                            id: 1,
                            name: 'Emma Smith',
                            profilePicture: 'https://example.com/profiles/1.jpg',
                            isSelf: true
                        }
                    },
                    {
                        text: 'Good Morning',
                        sender: {
                            id: 3,
                            name: 'Olivia Brown',
                            profilePicture: 'https://example.com/profiles/2.jpg',
                            isSelf: false
                        }
                    },
                    {
                        text: 'How are you?',
                        sender: {
                            id: 1,
                            name: 'Emma Smith',
                            profilePicture: 'https://example.com/profiles/1.jpg',
                            isSelf: true
                        }
                    },
                    {
                        text: "Can we start the class?",
                        sender: {
                            id: 7,
                            name: 'Ava Anderson',
                            profilePicture: 'https://example.com/profiles/3.jpg',
                            isSelf: false,
                        }
                    },
                    {
                        text: 'Hello Good Morning',
                        sender: {
                            id: 1,
                            name: 'Emma Smith',
                            profilePicture: 'https://example.com/profiles/1.jpg',
                            isSelf: true
                        }
                    },
                    {
                        text: 'Good Morning',
                        sender: {
                            id: 3,
                            name: 'Olivia Brown',
                            profilePicture: 'https://example.com/profiles/2.jpg',
                            isSelf: false
                        }
                    },
                    {
                        text: 'How are you?',
                        sender: {
                            id: 1,
                            name: 'Emma Smith',
                            profilePicture: 'https://example.com/profiles/1.jpg',
                            isSelf: true
                        }
                    },
                    {
                        text: "Can we start the class?",
                        sender: {
                            id: 7,
                            name: 'Ava Anderson',
                            profilePicture: 'https://example.com/profiles/3.jpg',
                            isSelf: false,
                        }
                    },
                    {
                        text: 'Hello Good Morning',
                        sender: {
                            id: 1,
                            name: 'Emma Smith',
                            profilePicture: 'https://example.com/profiles/1.jpg',
                            isSelf: true
                        }
                    },
                    {
                        text: 'Good Morning',
                        sender: {
                            id: 3,
                            name: 'Olivia Brown',
                            profilePicture: 'https://example.com/profiles/2.jpg',
                            isSelf: false
                        }
                    },
                    {
                        text: 'How are you?',
                        sender: {
                            id: 1,
                            name: 'Emma Smith',
                            profilePicture: 'https://example.com/profiles/1.jpg',
                            isSelf: true
                        }
                    },
                    {
                        text: "Can we start the class?",
                        sender: {
                            id: 7,
                            name: 'Ava Anderson',
                            profilePicture: 'https://example.com/profiles/3.jpg',
                            isSelf: false,
                        }
                    },
                ]
                dispatcher(setMessages(messages));
            }
        }
    }, []);

    const takeUserData = useCallback(() => {
        if (!classRoom) {
            return {messages: [], userData: {}};
        }
        let userData, messages = classRoom.messages;
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

        return {messages, userData};
    }, [classRoom])

    const {messages, userData} = takeUserData();

    useEffect(() => {
        if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if (!message.trim()) return;
        // TODO: send message to server

        const messageData = {
            text: message,
            sender: {
                id: userData.id,
                name: userData.name,
                profilePicture: userData.profilePicture,
                isSelf: true
            }
        }

        dispatcher(addMessage(messageData));
        setMessage('');
    }

    if (!messages) return <div/>;

    return (
        <div className={'gap-4 p-2 flex flex-col h-full'}>
            <div className={'gap-2 p-3 bg-primary h-full flex flex-col rounded-sm w-full'}>
                <div className={'overflow-y-scroll w-full h-full'} ref={messagesRef}>
                    {
                        messages.map((message, index) => {
                            return (<div key={index} className={'flex flex-col gap-1 w-full' + (message.sender.isSelf ? ' items-end' : ' justify-start')}>
                                <span className={'text-[12px] text-sm'}>{message.sender.name}</span>
                                <div className={'flex items-center gap-2 ' + (message.sender.isSelf ? 'flex-row-reverse' : 'flex-row')}>
                                    <img
                                        src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                                        alt={''}
                                        className={'object-cover w-8 h-8 rounded-full'}
                                    />
                                    <div className={'flex flex-col gap-1'}>
                                        <span className={'px-2 py-1 rounded-full text-[10px]' + (message.sender.isSelf ? ' bg-white white-black' : ' bg-logo-green text-white')}>{message.text}</span>
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