import {LargeScreenRightSideController} from "./LargeScreenRightSideController/LargeScreenRightSideController.jsx";

// eslint-disable-next-line react/prop-types
export const LargeScreenRightSide = ({children}) => {
	return (
		<div className={'flex-[4] flex flex-col gap-2'}>
			<div className={'h-full w-full'}>
				{children}
			</div>
			<LargeScreenRightSideController/>
		</div>
	)
}