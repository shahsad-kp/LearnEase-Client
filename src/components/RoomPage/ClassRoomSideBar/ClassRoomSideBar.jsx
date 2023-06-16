import {ClassRoomToolbar} from "../../";

export const ClassRoomSideBar = () => {
	return (
		<div className={'hidden md:flex flex-col gap-2.5 max-w-[500px] md:w-[250px] lg:w-[23%]  h-full'}>
			<div className={'w-full bg-red-800 h-1/3 max-h-[200px]'}></div>
			<ClassRoomToolbar/>
		</div>

	)
}