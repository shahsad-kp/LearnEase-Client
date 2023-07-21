import {useState} from "react";
import {SmallScreenBottomBar} from "../SmallScreenBottomBar/SmallScreenBottomBar.jsx";
import {ParticipantsList} from "../../SecondaryComponents/ParticipantsList/ParticipantsList.jsx";
import {Messages} from "../../SecondaryComponents/Messages/Messages.jsx";
import {DocumentsList} from "../../SecondaryComponents/DocumentsList/DocumentsList.jsx";
import {ActivitiesList} from "../../SecondaryComponents/Activities/ActivitiesList.jsx";

export const SmallScreenBottomSide = () => {
	const [selected, setSelected] = useState('participants');
	let content;
	if (selected === 'participants') {
        content = <ParticipantsList/>;
    } else if (selected === 'chat') {
        content = <Messages/>;
    } else if (selected === 'documents') {
        content = <DocumentsList/>;
    } else {
        content = <ActivitiesList/>
    }

	return (
		<div className={'h-full flex flex-col'}>
            <div className={'flex-1 flex flex-col h-full bg-primary p-3'}>
                {content}
            </div>
            <SmallScreenBottomBar setSelected={setSelected} selected={selected}/>
		</div>
	)
}