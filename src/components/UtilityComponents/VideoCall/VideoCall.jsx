import DemoImage from "../../../assets/demo/man-with-headset-video-call.jpg";

// eslint-disable-next-line react/prop-types
export const VideoCall = ({name, isLecturer, isSelf, className = '', ...extra}) => {
    return (
        <div
            className={`h-full bg-cover bg-center rounded relative ${className}`}
            style={{
                backgroundImage: `url(${DemoImage})`,
            }}
            {...extra}
        >
            <div className={'absolute left-0 top-0 flex flex-row text-sm'}>
                <div className={'rounded-tl bg-logo-yellow px-2 font-semibold'}>
                    {isLecturer ? 'Lecturer' : 'Student'}
                </div>
                <div className={'rounded-br px-2 ' + (!isSelf ? ' bg-accent-color-one' : ` bg-dangerColor`)}>
                    {isSelf ? 'You' :name}
                </div>
            </div>
        </div>
    )
}