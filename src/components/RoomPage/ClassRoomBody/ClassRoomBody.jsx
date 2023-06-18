import {RightSide, ClassRoomSideBar} from "../../";

// eslint-disable-next-line react/prop-types
export const ClassRoomBody = ({children}) => {
    return (
        <div className={'flex relative gap-2.5 flex-row flex-1 h-full p-0 md:p-4'}>
            <ClassRoomSideBar/>
            <RightSide>
                {children}
            </RightSide>
        </div>
    )
}