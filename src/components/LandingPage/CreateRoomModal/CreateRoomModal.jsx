import {InputField} from "../../UtilityComponents/InputFields/InputField.jsx";
import {GrAdd, GrFormClose} from "react-icons/gr";
import {homePageButton, homePageTextAreaClass} from "../../styles.js";
import {Modal} from "../../UtilityComponents/Modal/Modal.jsx";
import {useEffect, useRef, useState} from "react";


// eslint-disable-next-line react/prop-types
export const CreateRoomModal = ({closeFunction}) => {
    const [roomName, setRoomName] = useState('');
    const [roomNameError, setRoomNameError] = useState('');
    const [topicError, setTopicError] = useState('');
    const [topics, setTopics] = useState([{
        title: 'Syllabus Topic',
        content: 'This is the content of the topic',
    }]);
    const [selectedTopicIdx, setSelectedTopicIdx] = useState(0);
    const topicsRef = useRef(null);

    const addNewTopic = (event) => {
        event.preventDefault();
        const topic = {
            title: 'Topic ' + (topics.length + 1),
            content: '',
        }
        setTopics((topics) => {
            if (topics.length === 20) {
                return topics;
            } else {
                return [...topics, topic];
            }
        });
    }

    const selectTopic = (idx) => {
        setSelectedTopicIdx(idx);
    }

    const removeTopic = (idx) => {
        setTopics((topics) => {
            if (topics.length === 1) {
                return topics;
            } else {
                return topics.filter((topic, index) => index !== idx);
            }
        });
    }

    const updateTitle = (index, value) => {
        setTopicError('');
        setTopics((topics) => {
            const newTopics = [...topics];
            newTopics[index].title = value;
            return newTopics;
        });
    }

    const updateContent = (index, value) => {
        setTopicError('');
        setTopics((topics) => {
            const newTopics = [...topics];
            newTopics[index].content = value;
            return newTopics;
        });
    }

    const updateRoomName = (event) => {
        setRoomNameError('');
        setRoomName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (roomName.trim() === '') {
            setRoomNameError('Room name cannot be empty');
            return;
        }

        const filteredTopics = topics.filter((topic) => {
            return topic.title.trim() !== '' && topic.content.trim() !== '';
        });

        if (filteredTopics.length === 0) {
            setTopicError('At least one topic is required');
        }

    }

    useEffect(() => {
        if (topics.length <= selectedTopicIdx) {
            topicsRef.current.scrollLeft = 0;
            setSelectedTopicIdx(0);
        }
    }, [topics]);

    return (<Modal closeFunction={closeFunction} classNames={' bg-secondary p-3 rounded'}>
            <div className={'flex flex-col gap-2.5 w-100%'}>
                <InputField
                    type={'text'}
                    classNames={'!max-w-[100%] md:max-w-screen-xl'}
                    placeholder={'Enter room name'}
                    value={roomName}
                    onChange={updateRoomName}
                />
                {roomNameError && <ul>
                    <li className={'text-dangerColor font-serif text-xs'}>{roomNameError}</li>
                </ul>}
                <form className={'max-w-screen-xl flex flex-col gap-1.5'}>
                    <div className={'flex flex-row overflow-x-scroll gap-1'} ref={topicsRef}>
                        {
                            topics.map((topic, index) => (
                                <div
                                    key={index}
                                    data-tooltip-id={'tooltip'}
                                    data-tooltip-content={topic.title}
                                    className={'flex flex-row gap-1 items-center px-3 py-1.5 mb-1 rounded' +
                                        ' cursor-pointer' + (index === selectedTopicIdx ? ' bg-accent-color-one' : ' bg-gray-200')}
                                    onClick={() => selectTopic(index)}
                                >
                                            <span
                                                className={'whitespace-nowrap font-semibold'}
                                            >{topic.title || 'Topic'}</span>
                                    {topics.length !== 1 && (<GrFormClose onClick={() => removeTopic(index)}/>)}
                                </div>

                            ))
                        }
                        {
                            topics.length < 20 && (
                                <div
                                    onClick={addNewTopic}
                                    className={'flex flex-row gap-1 items-center bg-gray-200 px-3 py-1.5 mb-1 rounded cursor-pointer'}>
                                    <GrAdd/>
                                    <span className={'whitespace-nowrap font-semibold'}>Add topic</span>
                                </div>
                            )
                        }
                    </div>
                    <div className={'rounded flex flex-col gap-1.5'}>
                        <label htmlFor={'topic-name'} className={'text-gray-500 font-semibold'}>Topic</label>
                        <InputField
                            id={'topic-name'}
                            type={'text'}
                            classNames={'!max-w-[100%] md:max-w-screen-xl'}
                            placeholder={'Enter topic'}
                            value={topics[selectedTopicIdx] ? topics[selectedTopicIdx].title : ''}
                            onChange={(event) => {
                                updateTitle(selectedTopicIdx, event.target.value)
                            }}
                        />
                        <label htmlFor={'content-area'}
                               className={'text-gray-500 font-semibold'}>Content</label>
                        <textarea
                            id={'content-area'}
                            className={homePageTextAreaClass}
                            value={topics[selectedTopicIdx] ? topics[selectedTopicIdx].content : ''}
                            onChange={(event) => {
                                updateContent(selectedTopicIdx, event.target.value)
                            }}
                        />

                    </div>
                    {topicError && <ul>
                        <li className={'text-dangerColor font-serif text-xs'}>{topicError}</li>
                    </ul>}
                    <button
                        className={homePageButton + ' !w-full'}
                        onClick={handleSubmit}
                    >Create Classroom
                    </button>
                </form>
            </div>
        </Modal>
    )
}