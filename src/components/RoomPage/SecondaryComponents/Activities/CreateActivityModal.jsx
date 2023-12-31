import {InputField} from "../../../UtilityComponents/InputFields/InputField.jsx";
import {Modal} from "../../../UtilityComponents/Modal/Modal.jsx";
import {useContext, useState} from "react";
import {activityContext} from "../../../../service/sockets/ActivitySocket.jsx";

// eslint-disable-next-line react/prop-types
export const CreateActivityModal = ({closeFunction}) => {
    const [question, setQuestion] = useState('');
    const [questionError, setQuestionError] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [optionsError, setOptionsError] = useState('');
    const [rightAnswer, setRightAnswer] = useState(null);
    const {sendNewActivityToServer} = useContext(activityContext);

    const updateQuestion = (e) => {
        setQuestion(e.target.value);
        setQuestionError('');
    }

    const updateOptions = (e) => {
        const index = parseInt(e.target.name);
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOptions(newOptions);
        setOptionsError('');
    }

    const validate = () => {
        let valid = true;
        if (question === '') {
            setQuestionError('Question cannot be empty');
            valid = false;
        }
        if (options.includes('')) {
            valid = false;
            if (options[0] === '') {
                setOptionsError('Option 1 cannot be empty');
            } else if (options[1] === '') {
                setOptionsError('Option 2 cannot be empty');
            } else if (options[2] === '') {
                setOptionsError('Option 3 cannot be empty');
            } else if (options[3] === '') {
                setOptionsError('Option 4 cannot be empty');
            } else {
                setOptionsError('All options cannot be empty');
            }
        } else if (rightAnswer === null) {
            valid = false;
            setOptionsError('Please select the right answer');
        }
        return valid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const activity = {
                question,
                options,
                correctAnswer: options[rightAnswer],
            }
            sendNewActivityToServer(activity)
            closeFunction();
        }
    }

    const changeRightAnswer = (e) => {
        setRightAnswer(parseInt(e.target.value));
        setOptionsError('');
    }

    return (
        <Modal closeFunction={closeFunction} classNames={'bg-secondary dark:bg-dark-secondary dark:border-dark-primary dark:border p-4 rounded md:!max-w-[25%]'}>
            <form className={'flex flex-col gap-2.5 w-full'} onSubmit={handleSubmit}>
                <h5 className={'font-semibold'}>Create Activity</h5>
                <InputField
                    type={'text'}
                    classNames={'!max-w-[100%] md:max-w-screen-xl text-black dark:text-white'}
                    placeholder={'Question'}
                    value={question}
                    onChange={updateQuestion}
                />
                {questionError && <ul>
                    <li className={'text-danger-color dark:text-dark-danger-color font-serif text-xs'}>{questionError}</li>
                </ul>}
                <div className={'flex flex-col gap-2 w-full'}>
                    <h5 className={'font-semibold text-black dark:text-white'}>Options</h5>
                    <div className={'w-full justify-between flex gap-2 flex-row'}>
                        <InputField
                            type={'text'}
                            classNames={'!max-w-[100%] md:max-w-screen-xl text-black dark:text-white'}
                            placeholder={'Option 1'}
                            name={'0'}
                            value={options[0]}
                            onChange={updateOptions}
                        />
                        <input
                            type={'radio'}
                            name={'rightAnswer'}
                            value={0}
                            onChange={changeRightAnswer}
                        />
                    </div>
                    <div className={'w-full justify-between flex gap-2 flex-row'}>
                        <InputField
                            type={'text'}
                            classNames={'!max-w-[100%] md:max-w-screen-xl text-black dark:text-white'}
                            placeholder={'Option 2'}
                            name={'1'}
                            value={options[1]}
                            onChange={updateOptions}
                        />
                        <input
                            type={'radio'}
                            name={'rightAnswer'}
                            value={1}
                            onChange={changeRightAnswer}
                        />
                    </div>
                    <div className={'w-full justify-between flex gap-2 flex-row'}>
                        <InputField
                            type={'text'}
                            classNames={'!max-w-[100%] md:max-w-screen-xl text-black dark:text-white'}
                            placeholder={'Option 3'}
                            name={'2'}
                            value={options[2]}
                            onChange={updateOptions}
                        />
                        <input
                            type={'radio'}
                            name={'rightAnswer'}
                            value={2}
                            onChange={changeRightAnswer}
                        />
                    </div>
                    <div className={'w-full justify-between flex gap-2 flex-row'}>
                        <InputField
                            type={'text'}
                            classNames={'!max-w-[100%] md:max-w-screen-xl text-black dark:text-white'}
                            placeholder={'Option 4'}
                            name={'3'}
                            value={options[3]}
                            onChange={updateOptions}
                        />
                        <input
                            type={'radio'}
                            name={'rightAnswer'}
                            value={3}
                            onChange={changeRightAnswer}
                        />
                    </div>
                </div>
                {optionsError && <ul>
                    <li className={'text-danger-color dark:text-dark-danger-color font-serif text-xs'}>{optionsError}</li>
                </ul>}
                <div className={'flex flex-row gap-2.5 w-full'}>
                    <button
                        className={'bg-logo-green dark:bg-dark-logo-green w-full rounded text-white p-1'}
                    >Create Activity</button>
                </div>
            </form>
        </Modal>
    )
}