import {VideoCall} from "../../../UtilityComponents/VideoCall/VideoCall.jsx";
import {useSelector} from "react-redux";
import {useContext, useState} from "react";
import {videoCallContext} from "../../../../service/sockets/VideoCallSocket.jsx";
import {ParticipantsList} from "../../SecondaryComponents/ParticipantsList/ParticipantsList.jsx";
import {Skeleton} from "@mui/material";
import {LargeScreenLeftController} from "./LargeScreenLeftController/LargeScreenLeftController.jsx";
import {Messages} from "../../SecondaryComponents/Messages/Messages.jsx";
import {DocumentsList} from "../../SecondaryComponents/DocumentsList/DocumentsList.jsx";
import {ActivitiesList} from "../../SecondaryComponents/Activities/ActivitiesList.jsx";

export const LargeScreenLeftSide = () => {
	const classRoom = useSelector(state => state.classRoom.classRoom);
	const {lecturerConnection} = useContext(videoCallContext);
    const [selected, setSelected] = useState('participants');
    let content;
	if (selected === 'participants') {
        content = <ParticipantsList/>
    } else if (selected === 'chat') {
        content = <Messages/>;
    } else if (selected === 'documents') {
        content = <DocumentsList/>;
    } else {
        content = <ActivitiesList/>
    }

    if (!classRoom) return (<div className={'flex flex-1 flex-col gap-2 h-full'}>
        <Skeleton variant="rounded" width={'100%'} height={'30%'}/>
        <Skeleton variant="rounded" width={'100%'} height={'100%'}/>
        <Skeleton variant="rounded" width={'100%'} height={'100px'}/>
    </div>)

	return (
		<div className={'hidden max-w-[20%] md:flex flex-col flex-1 gap-2 h-full'}>
            <div className={'w-full h-[200px] shadow rounded p-2 bg-secondary dark:bg-dark-secondary'} style={{}}>
                <VideoCall
                    name={classRoom.lecturer.name}
                    userId={classRoom.lecturer.id}
                    mediaStream={lecturerConnection?.mediaStream}
                    isLecturer={true}
                    height={'100%'}
                    width={'100%'}
                    settings={classRoom.lecturer.settings}
                />
            </div>
            <div className={'w-full flex-1 p-2 shadow rounded bg-secondary dark:bg-dark-secondary'}>
                {content}
            </div>
            <LargeScreenLeftController selected={selected} setSelected={setSelected}/>
        </div>
	)
}