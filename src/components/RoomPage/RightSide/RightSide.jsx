import {RightToolbar} from "./../../";

// eslint-disable-next-line react/prop-types
export const RightSide = ({children}) => {
	return (
		<div className={'w-full flex flex-col gap-2.5 flex-1 h-full'}>
			{children}
			<RightToolbar/>
		</div>
	)
}