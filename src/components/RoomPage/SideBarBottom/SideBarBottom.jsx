import {IoDocumentsOutline, IoPeopleOutline, IoChatboxOutline} from "react-icons/io5";
import {RxActivityLog} from "react-icons/rx";

// eslint-disable-next-line react/prop-types
export const SideBarBottom = ({selected, setSelected}) => {
	return (
		<div className={'bg-secondary p-2 h-min shadow rounded-md flex flex-row justify-around'}>
			<div className={'w-min flex gap-1 flex-col justify-center cursor-pointer'} onClick={() => setSelected('participants')}>
				<div className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (selected==='participants' ? ' !bg-accent-color-one': '')}>
					<IoPeopleOutline className={'w-12 h-full'}/>
				</div>
				<span className={'w-full font-medium text-[10px] text-center'}>Participants</span>
			</div>
			<div className={'w-min flex gap-1  flex-col justify-center cursor-pointer'} onClick={() => setSelected('chatting')}>
				<div className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (selected==='chatting' ? ' !bg-accent-color-one': '')}>
					<IoChatboxOutline className={'w-12 h-full'}/>
				</div>
				<span className={'w-full font-medium text-[10px] text-center'}>Chatting</span>
			</div>
			<div className={'w-min flex gap-1  flex-col justify-center cursor-pointer'} onClick={() => setSelected('documents')}>
				<div className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (selected==='documents' ? ' !bg-accent-color-one': '')}>
					<IoDocumentsOutline className={'w-12 h-full'}/>
				</div>
				<span className={'w-full font-medium text-[10px] text-center'}>Documents</span>
			</div>
			<div className={'w-min flex gap-1  flex-col justify-center cursor-pointer'} onClick={() => setSelected('activities')}>
				<div className={'w-min h-10 box-border p-2 xl:bg-primary rounded' + (selected==='activities' ? ' !bg-accent-color-one': '')}>
					<RxActivityLog className={'w-12 h-full'}/>
				</div>
				<span className={'w-full font-medium text-[10px] text-center'}>Activities</span>
			</div>
		</div>
	)
}