import {RightToolbar} from "./../../";

// eslint-disable-next-line react/prop-types
export const RightSide = ({children}) => {
	return (
		<div className={'w-full flex flex-col flex-[4] gap-2.5 h-full'}>
			{children}
			<RightToolbar/>
		</div>
	)
}