import {RightSmallVideos} from "../../../../";
import {BiPencil} from "react-icons/bi"
import {TfiMarkerAlt} from "react-icons/tfi";
import {useContext, useEffect, useMemo, useRef} from "react";
import {BsEraser} from "react-icons/bs";
import {AiOutlineClear} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {changeColor, changeTool, clearLines,} from "../../../../../redux/whiteboardSlice/whiteboardSlice.js";
import {whiteboardCtx} from "../../../../../store/whiteboardData.jsx";
import {getWhiteboard} from "../../../../../service/api/whiteboard.js";
import {whiteboardContext} from "../../../../../service/sockets/WhiteboardSocket.jsx";

export const RightSideWhiteboard = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const classRoom = useSelector(state => state.classRoom.classRoom)
    const user = useSelector(state => state.auth.user)
    const whiteboard = useSelector(state => state.whiteboard.whiteboard);
    const whiteboardData = useContext(whiteboardCtx);
    const {
        sendWhiteboardToServer,
        sendClearToServer,
        sendLineToServer
    } = useContext(whiteboardContext)
    const dispatch = useDispatch();

    const colors = ['black', 'red', 'green', 'blue', 'yellow', 'purple', 'orange', 'brown', 'pink', 'gray'];

    const isLecturer = useMemo(() => {
        if (classRoom === null || user === null) {
            return false;
        }
        return classRoom.lecturer.id === user.id;
    }, [classRoom, user]);

    const applyData = (data) => {
        const canvas = canvasRef.current;
        if (data) {
            const image = new Image();
            image.src = data;
            image.onload = function () {
                contextRef.current.drawImage(image, 0, 0);
            };
        } else {
            contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    useEffect(() => {
        if (whiteboardData.current === null && classRoom !== null) {
            getWhiteboard({roomId: classRoom.id}).then(res => {
                whiteboardData.current = res.data;
                applyData(whiteboardData.current);
            }).catch(err => {
                console.log(err);
            })
        }
        const canvas = canvasRef.current;
        contextRef.current = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        applyData(whiteboardData.current);
        return () => {
            whiteboardData.current = canvas.toDataURL();
        }
    }, [classRoom, isLecturer, whiteboardData]);

    useEffect(() => {
        const sendData = () => {
            if (!isLecturer || canvasRef.current === null) {
                return;
            }
            const newData = canvasRef.current.toDataURL();
            sendWhiteboardToServer(newData)
        }
        const intervalId = setInterval(sendData, 1000);
        return () => {
            clearInterval(intervalId);
        }
    }, [isLecturer]);

    useEffect(() => {
        if ((whiteboard.pendingLines.length === 0) || isLecturer) {
            return;
        }
        const drawLine = (x0, y0, x1, y1, color, lineWidth) => {
            contextRef.current.beginPath()
            contextRef.current.moveTo(x0, y0)
            contextRef.current.lineTo(x1, y1)
            contextRef.current.lineWidth = lineWidth
            contextRef.current.strokeStyle = color
            contextRef.current.stroke()
        }
        for (let i = 0; i < whiteboard.pendingLines.length; i++) {
            const line = whiteboard.pendingLines[i];
            if (line.clear) {
                contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                continue;
            }
            drawLine(line.x0, line.y0, line.x1, line.y1, line.color, line.lineWidth);
        }
        dispatch(clearLines());
    }, [dispatch, isLecturer, whiteboard.pendingLines]);

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
                contextRef.current.beginPath()
                contextRef.current.moveTo(x0, y0)
                contextRef.current.lineTo(x1, y1)
                contextRef.current.lineWidth = lineWidth
                contextRef.current.strokeStyle = color
                contextRef.current.stroke()
                sendLineToServer({
                    x0: x0,
                    y0: y0,
                    x1: x1,
                    y1: y1,
                    color: color,
                    lineWidth: lineWidth
                })
            }

            const draw = (event) => {
                if (isDrawing) {
                    let line = null;
                    switch (whiteboard.tool.toLowerCase()) {
                        case 'pencil':
                            line = {
                                x1: previousPosition.x,
                                y1: previousPosition.y,
                                x2: event.offsetX,
                                y2: event.offsetY,
                                color: whiteboard.color,
                                width: 2
                            }

                            break;
                        case 'marker':
                            line = {
                                x1: previousPosition.x,
                                y1: previousPosition.y,
                                x2: event.offsetX,
                                y2: event.offsetY,
                                color: whiteboard.color,
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

            if (!isLecturer) {
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
        [isLecturer, whiteboard.color, whiteboard.tool]
    )


    const clearCanvas = () => {
        contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        sendClearToServer();
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
                                    className={`p-2.5 rounded active:bg-accent-color-one${
                                        whiteboard.tool === 'pencil' ? ' bg-accent-color-one' : ''
                                    }`}
                                    onClick={() => dispatch(changeTool('pencil'))}
                                >
                                    <BiPencil/>
                                </button>
                                <button
                                    className={`p-2.5 rounded active:bg-accent-color-one${
                                        whiteboard.tool === 'marker' ? ' bg-accent-color-one' : ''
                                    }`}
                                    onClick={() => dispatch(changeTool('marker'))}
                                >
                                    <TfiMarkerAlt/>
                                </button>
                                <button
                                    className={`p-2.5 rounded active:bg-accent-color-one${
                                        whiteboard.tool === 'eraser' ? ' bg-accent-color-one' : ''
                                    }`}
                                    onClick={() => dispatch(changeTool('eraser'))}
                                >
                                    <BsEraser/>
                                </button>
                                {
                                    colors.map(
                                        (color, index) => (
                                            <button
                                                key={index}
                                                className={`p-2.5 rounded active:bg-accent-color-one${
                                                    (whiteboard.color === color && whiteboard.tool !== 'eraser') ?
                                                        ' bg-accent-color-one' : ''
                                                }`}
                                                onClick={() => dispatch(changeColor(color))}
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