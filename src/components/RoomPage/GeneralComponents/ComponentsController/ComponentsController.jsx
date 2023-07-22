import {IoChatboxOutline, IoDocumentsOutline, IoPeopleOutline} from "react-icons/io5";
import {RxActivityLog} from "react-icons/rx";

// eslint-disable-next-line react/prop-types
export const ComponentsController = ({selected, setSelected}) => {
	return (
		<>
			<div
                    className={`p-2 rounded-full active:text-secondary active:bg-accent-color-one ${selected === 'participants' ? 'text-black dark:text-white' : 'text-gray-500'}`}
                    onClick={() => setSelected('participants')}
                >
                    <IoPeopleOutline/>
                </div>
                <div
                    onClick={() => setSelected('chat')}
                    className={`p-2 rounded-full active:text-secondary active:bg-accent-color-one ${selected === 'chat' ? 'text-black dark:text-white' : 'text-gray-500'}`}
                >
                    <IoChatboxOutline/>
                </div>
                <div
                    onClick={() => setSelected('documents')}
                    className={`p-2 rounded-full active:text-secondary active:bg-accent-color-one ${selected === 'documents' ? 'text-black dark:text-white' : 'text-gray-500'}`}
                >
                    <IoDocumentsOutline/>
                </div>
                <div
                    onClick={() => setSelected('activity')}
                    className={`p-2 rounded-full active:text-secondary dark:active:text-dark-secondary active:bg-accent-color-one dark:active:bg-dark-accent-color-one ${selected === 'activity' ? 'text-black dark:text-white' : 'text-gray-500'}`}
                >
                    <RxActivityLog/>
                </div>
		</>
	)
}