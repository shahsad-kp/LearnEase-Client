import LogoBanner from '../../../assets/logo/logo-banner.png'
import DarkLogoBanner from '../../../assets/logo/dark-logo-banner.png'
import {CreateRoomModal, InputField} from "../../";
import {homePageButton} from "../../styles.js";
import {useContext, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getHistory} from "../../../service/api/classRoom.js";
import {themeCtx} from "../../../store/themeCtx.jsx";

export const HomeBody = () => {
    const [history, setHistory] = useState([]);
    const [createRoomModal, setCreateRoomModal] = useState(false);
    const [roomId, setRoomId] = useState('');
    const navigator = useNavigate();
    const {colorTheme} = useContext(themeCtx);
    const [joining, setJoining] = useState(false);

    useEffect(() => {
        getHistory().then(totalHistory => {
            totalHistory = totalHistory.map(room => {
                room.created_at = new Date(room.created_at);
                return room;
            })
            setHistory(totalHistory);
        })

    }, []);

    const joinClassroom = (event) => {
        event.preventDefault();
        if (!roomId) return;
        setJoining(true);
        navigator(`/${roomId}/room/`);
    }

    const image = useMemo(() => {
        return colorTheme === 'dark' ? DarkLogoBanner : LogoBanner;
    }, [colorTheme]);

    return (
        <>
            <main className={'flex flex-col md:flex-row justify-center h-full gap-3.5 md:gap-0 p-3.5 md:p-0'}>
                <div className={'h-full w-full flex justify-center items-center'}>
                    <div className={'w-[90%] md:w-1/2 flex flex-col gap-9'}>
                        <div className={''}>
                            <img src={image} alt={'logo'}/>
                        </div>
                        <div className={'w-full flex flex-col gap-2.5'}>
                            <div className={'w-full flex flex-row gap-2.5'}>
                                <InputField
                                    type={'text'}
                                    placeholder={'Enter room id'}
                                    classNames={'md:max-w-xs !max-w-full font-mono text-black dark:text-white'}
                                    value={roomId}
                                    onChange={(e) => setRoomId(e.target.value)}
                                />
                                <button
                                    className={homePageButton + (joining ? ' cursor-not-allowed' : '')}
                                    onClick={joinClassroom}
                                >
                                    {joining ? 'Joining...' : 'Join'}
                                </button>
                            </div>
                            <div>
                                <button
                                    className={homePageButton + ' !w-full'}
                                    onClick={() => setCreateRoomModal(true)}
                                >
                                    Create Room
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'h-full w-full flex justify-center items-center'}>
                    <div
                        className={'w-[90%] md:w-1/2 max-h-full bg-secondary dark:bg-dark-secondary flex flex-col shadow rounded-md p-3.5'}>
                        <h3 className={'font-semibold text-dark dark:text-white border-b pb-2 mb-2'}>History</h3>
                        <div
                            className={'flex flex-col gap-2.5  overflow-y-auto'}
                            style={{maxHeight: 'calc(100vh - 200px)'}}
                        >
                            {
                                history.length ? history.map((room, index) => (
                                    <div key={index} className={'flex justify-between'}>
                                        <div className={'text-black dark:text-white'}>{room.title}</div>
                                        <div className={'flex flex-row gap-1.5'}>
                                            <span
                                                className={'text-black dark:text-white'}>{room.created_at.toLocaleDateString()}</span>
                                            {/*<span*/}
                                            {/*    className={'text-logo-green dark:text-dark-logo-green cursor-pointer'}>View</span>*/}
                                        </div>
                                    </div>
                                )) : <div className={'text-center italic text-black dark:text-white'}>No history</div>
                            }
                        </div>
                    </div>
                </div>

            </main>
            {createRoomModal && (
                <CreateRoomModal closeFunction={() => setCreateRoomModal(false)}/>
            )}
        </>
    )
}