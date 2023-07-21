import {SmallScreenBody} from "../SmallScreen/SmallScreenBody/SmallScreenBody.jsx";
import {LargeScreenBody} from "../LargeScreen/LargeScreenBody/LargeScreenBody.jsx";

// eslint-disable-next-line react/prop-types
export const ClassRoomBody = ({children}) => {
    return (
        (
            <>
                <SmallScreenBody>
                    {children}
                </SmallScreenBody>
                <LargeScreenBody>
                    {children}
                </LargeScreenBody>
            </>
        )
    )
}