import {SideBarActivity, SideBarBottom, SideBarChat, SideBarDocuments, SideBarParticipants, VideoCall} from "../../";
import {useContext, useState} from "react";
import {useSelector} from "react-redux";
import {videoCallContext} from "../../../service/sockets/VideoCallSocket.jsx";

export const ClassRoomSideBar = () => {
	const classRoom = useSelector(state => state.classRoom.classRoom);
	const {lecturerConnection} = useContext(videoCallContext);
	const [selected, setSelected] = useState('participants');
	let content = null;
	if (selected === 'participants'){
		content = <SideBarParticipants/>
	}
	else if (selected === 'chatting'){
		content = <SideBarChat/>
	}
	else if (selected === 'documents'){
		content = <SideBarDocuments/>
	}
	else{
		content = <SideBarActivity/>
	}
	if (!classRoom){
		return <div/>
	}


	return (
		<div className={'flex flex-col flex-1 justify-between h-full'}>
			<div className={'w-full h-[200px] shadow rounded p-2 bg-white'} style={{}}>
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
			<div className={'w-full h-[calc(100vh-385px)] shadow rounded bg-secondary'}>
				{content}
			</div>
			<SideBarBottom selected={selected} setSelected={setSelected}/>
		</div>

	)
}