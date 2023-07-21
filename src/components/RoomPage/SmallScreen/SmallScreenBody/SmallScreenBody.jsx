import {SmallScreenBottomSide} from "../SmallScreenBottomSide/SmallScreenBottomSide.jsx";

// eslint-disable-next-line react/prop-types
export const SmallScreenBody = ({children}) => {
	return (<div className={'md:hidden flex flex-col h-full w-full bg-primary'}>
		<div className={'h-full w-full max-h-[50%] p-3'}>
			{children}
		</div>
		<div className={'w-full h-full'}>
			<SmallScreenBottomSide/>
		</div>
	</div>)
}