import {RightSide, ClassRoomSideBar} from "../../";

// eslint-disable-next-line react/prop-types
export const ClassRoomBody = ({children}) => {
    return (
        <div className={'flex gap-2.5 flex-row h-full w-100 p-0 md:p-4'}>
            <ClassRoomSideBar/>
            <RightSide>
                {children}
            </RightSide>
        </div>
    )
}