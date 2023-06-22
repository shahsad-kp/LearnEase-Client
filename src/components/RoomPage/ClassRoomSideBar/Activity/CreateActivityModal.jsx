import {InputField} from "../../../UtilityComponents/InputFields/InputField.jsx";
import {Modal} from "../../../UtilityComponents/Modal/Modal.jsx";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addActivity} from "../../../../redux/classRoomSlice/classRoomSlice.js";

// eslint-disable-next-line react/prop-types
export const CreateActivityModal = ({closeFunction}) => {
    const [question, setQuestion] = useState('');
    const [questionError, setQuestionError] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [optionsError, setOptionsError] = useState('');
    const [rightAnswer, setRightAnswer] = useState(null);
    const dispatcher = useDispatch();

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
                id: Math.random(),
                title: question,
                options: options,
                correctAnswer: options[rightAnswer],
                totalResponses: 0,
                totalCorrectResponses: 0,
                responses: [],
                response: null,
            }

            // TODO: Add activity to server

            dispatcher(addActivity(activity));
            closeFunction();
        }
    }

    const changeRightAnswer = (e) => {
        setRightAnswer(parseInt(e.target.value));
        setOptionsError('');
    }

    return (
        <Modal closeFunction={closeFunction} classNames={' bg-secondary p-4 rounded !max-w-[25%]'}>
            <form className={'flex flex-col gap-2.5 w-full'} onSubmit={handleSubmit}>
                <h5 className={'font-semibold'}>Create Activity</h5>
                <InputField
                    type={'text'}
                    classNames={'!max-w-[100%] md:max-w-screen-xl'}
                    placeholder={'Question'}
                    value={question}
                    onChange={updateQuestion}
                />
                {questionError && <ul>
                    <li className={'text-dangerColor font-serif text-xs'}>{questionError}</li>
                </ul>}
                <div className={'flex flex-col gap-2 w-full'}>
                    <h5 className={'font-semibold'}>Options</h5>
                    <div className={'w-full justify-between flex gap-2 flex-row'}>
                        <InputField
                            type={'text'}
                            classNames={'!max-w-[100%] md:max-w-screen-xl'}
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
                            classNames={'!max-w-[100%] md:max-w-screen-xl'}
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
                            classNames={'!max-w-[100%] md:max-w-screen-xl'}
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
                            classNames={'!max-w-[100%] md:max-w-screen-xl'}
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
                    <li className={'text-dangerColor font-serif text-xs'}>{optionsError}</li>
                </ul>}
                <div className={'flex flex-row gap-2.5 w-full'}>
                    <button className={'bg-logo-green w-full rounded text-white p-1'}>Create Activity</button>
                </div>
            </form>
        </Modal>
    )
}