import {RightSmallVideos} from "../../../../";
import {BiPencil} from "react-icons/bi"
import {TfiMarkerAlt} from "react-icons/tfi";
import {useState} from "react";
import {BsEraser} from "react-icons/bs";
import {IoArrowRedoOutline, IoArrowUndoOutline} from "react-icons/io5";
import {AiOutlineClear} from "react-icons/ai";

export const RightSideWhiteboard = () => {
    const [selectedTool, setSelectedTool] = useState('pencil');
    const [selectedColor, setSelectedColor] = useState('black');

    const colors = [
        'black',
        'red',
        'blue',
        'green',
        'yellow',
        'orange',
        'purple',
        'pink',
        'brown',
        'white'
    ]

    const undoLine = () => {
        // TODO: undo line

        return () => {
            console.log('undo line')
        }
    }

    const redoLine = () => {

        // TODO: redo line
        return () => {
            console.log('redo line')
        }
    }

    const clearCanvas = () => {
        // TODO: clear canvas
        return () => {
            console.log('clear canvas')
        }
    }

    return (
        <div className={'flex-1 w-full h-[calc(100vh-173px)]'}>
            <div className={'flex flex-row-reverse w-[inherit] h-[inherit] gap-1.5'}>
                <RightSmallVideos/>
                <div className={'flex flex-1 flex-row gap-2.5'}>
                    <div className={'rounded flex flex-col bg-secondary justify-between h-full shadow'}>
                        <button
                            className={'p-2.5 rounded active:bg-accent-color-one' + (selectedTool === 'pencil' ? ' bg-accent-color-one' : '')}
                            onClick={() => setSelectedTool('pencil')}
                        >
                            <BiPencil/>
                        </button>
                        <button
                            className={'p-2.5 rounded active:bg-accent-color-one' + (selectedTool === 'marker' ? ' bg-accent-color-one' : '')}
                            onClick={() => setSelectedTool('marker')}
                        >
                            <TfiMarkerAlt/>
                        </button>
                        <button
                            className={'p-2.5 rounded active:bg-accent-color-one' + (selectedTool === 'eraser' ? ' bg-accent-color-one' : '')}
                            onClick={() => setSelectedTool('eraser')}
                        >
                            <BsEraser/>
                        </button>
                        {
                            colors.map(
                                (color, index) => (
                                    <button
                                        key={index}
                                        className={'p-2.5 rounded active:bg-accent-color-one' + (selectedColor === color ? ' bg-accent-color-one' : '')}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        <div className={'h-[15px] w-full border border-gray-600'}
                                             style={{backgroundColor: color}}/>
                                    </button>
                                )
                            )
                        }

                        <button
                            className={'p-2.5 rounded active:bg-accent-color-one'}
                            onClick={clearCanvas()}
                        >
                            <AiOutlineClear/>
                        </button>
                        <button
                            className={'p-2.5 rounded active:bg-accent-color-one'}
                            onClick={undoLine()}
                        >
                            <IoArrowUndoOutline/>
                        </button>

                        <button
                            className={'p-2.5 rounded active:bg-accent-color-one'}
                            onClick={redoLine()}
                        >
                            <IoArrowRedoOutline/>
                        </button>
                    </div>
                    <div className={'flex-1 bg-secondary rounded shadow'}></div>
                </div>
            </div>
        </div>
    )
}