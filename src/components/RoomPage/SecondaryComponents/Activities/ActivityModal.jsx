import {Modal} from "../../../UtilityComponents/Modal/Modal.jsx";

// eslint-disable-next-line react/prop-types
export const ActivityModal = ({closeFunction, activity}) => {
    return (
        <Modal closeFunction={closeFunction} classNames={'bg-secondary dark:bg-dark-secondary gap-2.5 p-4 rounded md:!max-w-[25%] max-h-[75%]'}>
            <div className={'flex flex-col gap-2.5'}>
                {/* eslint-disable-next-line react/prop-types */}
                <h4 className={'text-[14px] text-center font-semibold text-black dark:text-white'}>{activity.title}</h4>
                <div className={'h-full w-full flex flex-col gap-2'}>
                    {
                        // eslint-disable-next-line react/prop-types
                        activity.responses.map((response, index) => {
                            return (
                                <div
                                    className={
                                        'w-full p-2 rounded flex flex-col ' +
                                        (response.isCorrect ? 'bg-green-300 dark:bg-green-800' : 'bg-red-300 dark:bg-red-800')
                                    }
                                    key={`response-${index}`}
                                >
                                    <span className={'text-[13px] font-semibold text-black dark:text-white'}>{response.name}</span>
                                    <span className={'text-[11px] text-black dark:text-white'}>Response: {response.response}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </Modal>
    )
}