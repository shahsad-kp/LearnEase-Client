import {SideBarBottom, SideBarChat, SideBarParticipants, VideoCall} from "../../";
import {useState} from "react";
import {useSelector} from "react-redux";

export const ClassRoomSideBar = () => {
	const classRoom = useSelector(state => state.classRoom.classRoom);

	const [selected, setSelected] = useState('participants');

	let content = null;
	if (selected === 'participants'){
		content = <SideBarParticipants/>
	}
	else if (selected === 'chatting'){
		content = <SideBarChat/>
	}
	else if (selected === 'documents'){
		content = <div>Polls</div>
	}
	else if (selected === 'teachtools'){
		content = <div>Files</div>
	}
	else{
		content = <div>Settings</div>
	}
	if (!classRoom){
		return <div/>
	}

	return (
		<div className={'flex flex-col flex-1 justify-between h-full'}>
			<div className={'w-full h-[200px] shadow rounded p-2 bg-white'} style={{}}>
				<VideoCall isSelf={classRoom.lecturer.isSelf} name={classRoom.lecturer.name} isLecturer={true}/>
			</div>
			<div className={'w-full h-[calc(100vh-385px)] shadow rounded bg-secondary'}>
				{content}
			</div>
			<SideBarBottom selected={selected} setSelected={setSelected}/>
		</div>

	)
}