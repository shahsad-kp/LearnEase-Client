import {useSelector} from "react-redux";

export const Participants = () => {
    const classRoom = useSelector(state => state.classRoom);

    return (
        <div className={'gap-4 p-3 flex flex-col h-full'}>
            <div className={'gap-2 h-min flex flex-col'}>
                <h2 className={'font-bold border-b-2'}>Lecturer</h2>
                <div className={'flex flex-row gap-2.5 items-center'}>
                    <img
                        src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                        alt={''}
                        className={'object-cover w-10 h-10 rounded-full'}/>
                    <span className={'font-semibold'}>John Due</span>
                </div>
            </div>
            <div className={'gap-2 flex flex-col h-full w-full'}>
                <h2 className={'font-semibold border-b-2'}>Students <span>({0})</span>
                </h2>
                <ul className={'overflow-y-scroll gap-2 flex flex-col max-h-full'}>
                    <li className={'flex flex-row gap-2.5 items-center'}>
                        <img
                            src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            alt={''}
                            className={'object-cover w-10 h-10 rounded-full'}/>
                        <span className={'font-semibold'}>John Due</span>
                    </li>

                    <li className={'flex flex-row gap-2.5 items-center'}>
                        <img
                            src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            alt={''}
                            className={'object-cover w-10 h-10 rounded-full'}/>
                        <span className={'font-semibold'}>John Due</span>
                    </li>
                    <li className={'flex flex-row gap-2.5 items-center'}>
                        <img
                            src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            alt={''}
                            className={'object-cover w-10 h-10 rounded-full'}/>
                        <span className={'font-semibold'}>John Due</span>
                    </li>
                    <li className={'flex flex-row gap-2.5 items-center'}>
                        <img
                            src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            alt={''}
                            className={'object-cover w-10 h-10 rounded-full'}/>
                        <span className={'font-semibold'}>John Due</span>
                    </li>
                    <li className={'flex flex-row gap-2.5 items-center'}>
                        <img
                            src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            alt={''}
                            className={'object-cover w-10 h-10 rounded-full'}/>
                        <span className={'font-semibold'}>John Due</span>
                    </li>
                    <li className={'flex flex-row gap-2.5 items-center'}>
                        <img
                            src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            alt={''}
                            className={'object-cover w-10 h-10 rounded-full'}/>
                        <span className={'font-semibold'}>John Due</span>
                    </li>
                    <li className={'flex flex-row gap-2.5 items-center'}>
                        <img
                            src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            alt={''}
                            className={'object-cover w-10 h-10 rounded-full'}/>
                        <span className={'font-semibold'}>John Due</span>
                    </li>
                    <li className={'flex flex-row gap-2.5 items-center'}>
                        <img
                            src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                            alt={''}
                            className={'object-cover w-10 h-10 rounded-full'}/>
                        <span className={'font-semibold'}>John Due</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}