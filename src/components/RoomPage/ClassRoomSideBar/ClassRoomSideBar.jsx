import {Participants, SideBarBottom} from "../../";
import {useState} from "react";

export const ClassRoomSideBar = () => {
	const [selected, setSelected] = useState('participants');

	let content = null;
	if (selected === 'participants'){
		content = <div>Participants</div>
	}
	else if (selected === 'chatting'){
		content = <div>Chat</div>
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

	return (
		<div className={'flex flex-col w-[25%] h-full bg-green-800'}>
			<div className={'w-full h-[200px] bg-red-800'} style={{}}/>
			<div className={'w-full h-full rounded bg-secondary'}>
				{content}
			</div>
			<SideBarBottom selected={selected} setSelected={setSelected}/>
		</div>

	)
}