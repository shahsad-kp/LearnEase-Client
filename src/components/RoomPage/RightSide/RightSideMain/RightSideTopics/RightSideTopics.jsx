import {RightSmallVideos} from "../../../../";
import {useEffect, useMemo} from "react";
import {selectTopic, setTopics} from "../../../../../redux/classRoomSlice/classRoomSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {getTopics} from "../../../../../service/api/classRoom.js";

// eslint-disable-next-line react/prop-types
export const RightSideTopics = () => {
    const classRoom = useSelector(state => state.classRoom.classRoom);
    const dispatcher = useDispatch();

    const [topics, selectedTopic] = useMemo(() => {
        if (!classRoom) return [[], null];
        return [classRoom.topics, classRoom.selectedTopic];
    }, [classRoom]);

    useEffect(() => {
        if (classRoom) {
            if (classRoom.topics === undefined) getTopics({classRoomId: classRoom.id}).then(
                topics => dispatcher(setTopics(topics))
            );
        }
        if (!selectedTopic && topics && topics.length > 0) dispatcher(selectTopic(topics[0]));
    }, [classRoom, dispatcher, selectedTopic, topics]);


    if (!topics) return <div className={'w-full h-[calc(100vh-173px)]'}></div>;

    return (
        <div className={'flex-1 w-full h-[calc(100vh-173px)]'}>
            <div className={'flex flex-row-reverse w-[inherit] h-[inherit] gap-1.5'}>
                <RightSmallVideos/>
                <div className={'flex flex-row flex-1 gap-2.5'}>
                    <ul className={'w-1/3 h-full gap-1 flex flex-col bg-secondary rounded shadow overflow-y-auto'}>
                        {
                            topics.map((topic, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={
                                            `flex p-3 font-semibold rounded pointer 
                                        ${(
                                                selectedTopic &&
                                                (topic.id === selectedTopic.id)) ? 'bg-accent-color-one' : ''
                                            }`}
                                        onClick={() => dispatcher(selectTopic(topic))}
                                    >
                                        {topic.title}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div className={'w-full h-full bg-secondary rounded shadow p-3'}>
                        <div className={'h-full overflow-y-auto'}>
                            {
                                selectedTopic && <div className={'h-min'}>{selectedTopic.content}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}