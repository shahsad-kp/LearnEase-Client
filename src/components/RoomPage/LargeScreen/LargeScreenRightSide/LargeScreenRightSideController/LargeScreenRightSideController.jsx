import {
	VideoControllerControlBar
} from "../../../GeneralComponents/VideoControllerControlBar/VideoControllerControlBar.jsx";

export const LargeScreenRightSideController = () => {
	return (
		<div className={'p-2 bg-secondary dark:bg-dark-secondary w-full shadow rounded flex flex-row justify-between'}>
			<VideoControllerControlBar/>
		</div>
	)
}