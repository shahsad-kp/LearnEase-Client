import {SideBarBottom} from "../SideBarBottom/SideBarBottom.jsx";
import {useState} from "react";

export const ClassRoomToolbar = () => {
	const [selected, setSelected] = useState('participants');

	return (
		<div className={'flex-1 flex gap-2.5 flex-col w-full'}>
			<div className={'flex-1 bg-red-800 shadow rounded'}></div>
			<SideBarBottom selected={selected} setSelected={setSelected}/>
		</div>
	)
}