import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import {getTopics} from "../../../../service/api/classRoom.js";
import {selectTopic, setTopics} from "../../../../redux/classRoomSlice/classRoomSlice.js";
import {Skeleton} from "@mui/material";

export const TopicsPage = () => {
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

    if (!topics) {
        return <div className={'flex flex-row flex-1 gap-2.5'}>
            <Skeleton variant="rounded" width={'33.33%'} height={'100%'}/>
            <Skeleton variant="rounded" width={'100%'} height={'100%'}/>
        </div>
    }

    return (
        <div className={'w-full flex h-full flex-col md:flex-row-reverse gap-2'}>
            <div className={'w-full h-full md:flex-[4] bg-secondary dark:bg-dark-secondary rounded shadow p-3'}>
                <div className={'h-full overflow-y-auto'}>
                    {
                        selectedTopic && <div className={'h-full font-serif text-black dark:text-white'}>{selectedTopic.content}</div>
                    }
                </div>
            </div>
            <div className={'w-full md:w-min md:flex-[1] flex h-min md:h-full'}>
                <ul className={'w-max md:w-full h-min md:h-full md:bg-secondary md:dark:bg-dark-secondary md:shadow md:rounded flex flex-row md:flex-col gap-1'}>
                    {
                        topics.map((topic, index) => {
                            return (
                                <li
                                    key={index}
                                    className={
                                        `flex py-0.5 px-1.5 h-min md:px-4 md:py-2 w-fit md:w-full rounded text-black dark:text-white pointer font-medium md:font-semibold font-sans
                                        ${(
                                            selectedTopic &&
                                            (topic.id === selectedTopic.id)) ? 'bg-accent-color-one dark:bg-dark-accent-color-one' : ''
                                        }`}
                                    onClick={() => dispatcher(selectTopic(topic))}
                                >
                                    {topic.title}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}