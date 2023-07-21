// eslint-disable-next-line react/prop-types
import {LargeScreenLeftSide} from "../LargeScreenLeftSide/LargeScreenLeftSide.jsx";
import {LargeScreenRightSide} from "../LargeScreenRightSide/LargeScreenRightSide.jsx";

// eslint-disable-next-line react/prop-types
export const LargeScreenBody = ({children}) => {
    return (
        <div className={'hidden md:flex gap-2 h-screen flex-row p-2'}>
            <LargeScreenLeftSide/>
            <LargeScreenRightSide>
                {children}
            </LargeScreenRightSide>
        </div>
    )
}