import DemoImage from "../../../assets/demo/man-with-headset-video-call.jpg";

// eslint-disable-next-line react/prop-types
export const VideoCall = ({name, isLecturer, isSelf}) => {
    return (
        <div
            className={'h-full w-full bg-cover bg-center rounded-md relative'}
            style={{
                backgroundImage: `url(${DemoImage})`,
            }}
        >
            <div className={'absolute flex flex-row'}>
                <div className={'bg-logo-yellow rounded-tl-md px-2 text-sm font-medium'}>{isLecturer ? 'Lecturer' : 'Student'}</div>
                <div className={'rounded-br-md px-2 font-medium text-sm text-white' + (isSelf ? ' bg-[#ff000077]' : ' bg-accent-color-one')}>{isSelf ? 'You' : name}</div>
            </div>
        </div>
    )
}