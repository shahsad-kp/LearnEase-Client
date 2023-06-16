import {ClassRoomMain, ClassRoomSideBar} from "../../";

// eslint-disable-next-line react/prop-types
export const ClassRoomBody = ({children}) => {
    return (
        <div className={'flex flex-1 gap-2.5 flex-row w-100 p-0 md:p-4'}>
            <ClassRoomSideBar/>
            <ClassRoomMain>
                {children}
            </ClassRoomMain>
        </div>
    )
}