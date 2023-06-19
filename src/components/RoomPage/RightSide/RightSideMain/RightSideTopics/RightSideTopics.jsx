import {RightSmallVideos} from "../../../../";

export const RightSideTopics = () => {
    return (
        <div className={'flex-1 w-full h-[calc(100vh-173px)]'}>
            <div className={'flex flex-row-reverse w-[inherit] h-[inherit] gap-1.5'}>
                <RightSmallVideos/>
                <div className={'flex flex-1 rounded bg-white'}/>
            </div>
        </div>
    )
}