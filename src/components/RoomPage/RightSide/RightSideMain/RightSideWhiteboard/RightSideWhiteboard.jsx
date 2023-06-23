import {RightSmallVideos} from "../../../../";
import {BiPencil} from "react-icons/bi"
import {TfiMarkerAlt} from "react-icons/tfi";
import {useContext, useEffect, useMemo, useRef} from "react";
import {BsEraser} from "react-icons/bs";
import {IoArrowRedoOutline, IoArrowUndoOutline} from "react-icons/io5";
import {AiOutlineClear} from "react-icons/ai";
import {WhiteboardContext} from "../../../../../store/whiteboardContext.jsx";
import {useSelector} from "react-redux";

export const RightSideWhiteboard = () => {
    const canvasRef = useRef(null);
    const classRoom = useSelector(state => state.classRoom.classRoom)
    const {
        context,
        selectedColor,
        setSelectedColor,
        selectedTool,
        setSelectedTool,
    } = useContext(WhiteboardContext);

    const colors = ['black', 'red', 'green', 'blue', 'yellow', 'purple', 'orange', 'brown', 'pink', 'gray'];

    const isLecturer = useMemo(() => {
        return classRoom?.lecturer?.isSelf;
    }, [classRoom]);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        const newCtx = canvas.getContext('2d');
        if(context.current){
            newCtx.putImageData(context.current, 0, 0);
        }
        context.current = newCtx;

        return () => {
            context.current = context.current.getImageData(0, 0, canvas.width, canvas.height);
            console.log(context.current)
        }
    }, [context]);

    useEffect(
        () => {
            const canvas = canvasRef.current;
            let isDrawing = false;
            let previousPosition = {x: 0, y: 0};

            const startDrawing = (event) => {
                isDrawing = true;
                previousPosition = {x: event.offsetX, y: event.offsetY};
            }

            const stopDrawing = () => {
                isDrawing = false;
                previousPosition = {x: 0, y: 0};
            }

            const drawLine = (x0, y0, x1, y1, color, lineWidth) => {
                const context = canvas.getContext('2d');
                context.beginPath()
                context.moveTo(x0, y0)
                context.lineTo(x1, y1)
                context.lineWidth = lineWidth
                context.strokeStyle = color
                context.stroke()
            }

            const draw = (event) => {
                if (isDrawing) {
                    let line = null;
                    switch (selectedTool) {
                        case 'pencil':
                            line = {
                                x1: previousPosition.x,
                                y1: previousPosition.y,
                                x2: event.offsetX,
                                y2: event.offsetY,
                                color: selectedColor,
                                width: 2
                            }
                            console.log('hadf')
                            break;
                        case 'marker':
                            line = {
                                x1: previousPosition.x,
                                y1: previousPosition.y,
                                x2: event.offsetX,
                                y2: event.offsetY,
                                color: selectedColor,
                                width: 10
                            }
                            break;
                        case 'eraser':
                            line = {
                                x1: previousPosition.x,
                                y1: previousPosition.y,
                                x2: event.offsetX,
                                y2: event.offsetY,
                                color: 'white',
                                width: 20
                            }
                            break;
                        default:
                            break;
                    }
                    drawLine(line.x1, line.y1, line.x2, line.y2, line.color, line.width)
                    previousPosition = {x: event.offsetX, y: event.offsetY};
                }
            }

            const throttle = (callback, delay) => {
                let previousCall = new Date().getTime();
                return function () {
                    const time = new Date().getTime();

                    if ((time - previousCall) >= delay) {
                        previousCall = time;
                        callback.apply(null, arguments);
                    }
                };
            }

            if (!isLecturer){
                return;
            }

            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
            canvas.addEventListener('mousemove', throttle(draw, 10));

            return () => {
                canvas.removeEventListener('mousedown', startDrawing);
                canvas.removeEventListener('mouseup', stopDrawing);
                canvas.removeEventListener('mouseout', stopDrawing);
                canvas.removeEventListener('mousemove', throttle(draw, 100));
            }
        },
        [isLecturer, selectedColor, selectedTool]
    )

    const updateColor = color => {
        setSelectedColor(color);
        if (selectedTool === 'eraser') {
            setSelectedTool('pencil');
        }
    }

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
        context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    }

    return (
        <div className={'flex-1 w-full h-[calc(100vh-173px)]'}>
            <div className={'flex flex-row-reverse w-[inherit] h-[inherit] gap-1.5'}>
                <RightSmallVideos/>
                <div className={'flex flex-1 flex-row gap-2.5'}>
                    {
                        isLecturer && (
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
                                        className={'p-2.5 rounded active:bg-accent-color-one' + ((selectedColor === color && selectedTool !== 'eraser') ? ' bg-accent-color-one' : '')}
                                        onClick={() => updateColor(color)}
                                    >
                                        <div className={'h-[15px] w-full border border-gray-600'}
                                             style={{backgroundColor: color}}/>
                                    </button>
                                )
                            )
                        }

                        <button
                            className={'p-2.5 rounded active:bg-accent-color-one'}
                            onClick={clearCanvas}
                        >
                            <AiOutlineClear/>
                        </button>
                        <button
                            className={'p-2.5 rounded active:bg-accent-color-one'}
                            onClick={undoLine}
                        >
                            <IoArrowUndoOutline/>
                        </button>

                        <button
                            className={'p-2.5 rounded active:bg-accent-color-one'}
                            onClick={redoLine}
                        >
                            <IoArrowRedoOutline/>
                        </button>
                    </div>
                        )
                    }
                    <div className={'flex-1 bg-secondary p-3 rounded shadow'}>
                        <canvas id={'canvas'} className={'w-full h-full rounded'} ref={canvasRef}
                                style={{backgroundColor: 'white'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}