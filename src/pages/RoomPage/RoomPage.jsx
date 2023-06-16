import {ClassRoomBody, NavBar} from "../../components/";
import {Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {joinClassRoom, leaveClassRoom} from "../../redux/classRoomSlice/classRoomSlice.js";


export const RoomPage = () => {
	const classRoom = useSelector(state => state.classRoom);
	const dispatcher = useDispatch()
	const {roomId} = useParams();

	useEffect(() => {
		// TODO: Join classroom
		const room = {
            id: roomId,
            name: 'History 101',
            topics:[
				{
					id: '1',
					name: 'Topic 1',
					content: 'Instructior posidonium ornatus posidonium suas. Omittantur velit constituam eam' +
						' tacimates eloquentiam quaerendum. Pertinacia fames at saperet sociosqu his fabulas' +
						' patrioque per. Harum his hinc natum pulvinar contentiones. Litora qualisque autem ' +
						'necessitatibus brute sale pri volutpat hac.'
				},
				{
					id: '2',
					name: 'Topic 2',
					content: 'Instructior posidonium ornatus posidonium suas. Omittantur velit constituam eam' +
						' tacimates eloquentiam quaerendum. Pertinacia fames at saperet sociosqu his fabulas' +
						' patrioque per. Harum his hinc natum pulvinar contentiones. Litora qualisque autem ' +
						'necessitatibus brute sale pri volutpat hac.'
				},
				{
					id: '3',
					name: 'Topic 3',
					content: 'Instructior posidonium ornatus posidonium suas. Omittantur velit constituam eam' +
						' tacimates eloquentiam quaerendum. Pertinacia fames at saperet sociosqu his fabulas' +
						' patrioque per. Harum his hinc natum pulvinar contentiones. Litora qualisque autem ' +
						'necessitatibus brute sale pri volutpat hac.'
				},
				{
					id: '4',
					name: 'Topic 4',
					content: 'Instructior posidonium ornatus posidonium suas. Omittantur velit constituam eam' +
						' tacimates eloquentiam quaerendum. Pertinacia fames at saperet sociosqu his fabulas' +
						' patrioque per. Harum his hinc natum pulvinar contentiones. Litora qualisque autem ' +
						'necessitatibus brute sale pri volutpat hac.'
				},
				{
					id: '5',
					name: 'Topic 5',
					content: 'Instructior posidonium ornatus posidonium suas. Omittantur velit constituam eam' +
						' tacimates eloquentiam quaerendum. Pertinacia fames at saperet sociosqu his fabulas' +
						' patrioque per. Harum his hinc natum pulvinar contentiones. Litora qualisque autem ' +
						'necessitatibus brute sale pri volutpat hac.'
				},
			],
			participants: [
				{
					id: 1,
					name: 'Participant 1',
					role: 'instructor',
					profilePicture: 'https://picsum.photos/200/300',
					isSelf: true
				},
				{
					id: 2,
					name: 'Participant 2',
					role: 'student',
					profilePicture: 'https://picsum.photos/200/300',
					isSelf: false
				},
				{
					id: 3,
					name: 'Participant 3',
					role: 'student',
					profilePicture: 'https://picsum.photos/200/300',
					isSelf: false
				},
				{
					id: 4,
					name: 'Participant 4',
					role: 'student',
					profilePicture: 'https://picsum.photos/200/300',
					isSelf: false
				},
				{
					id: 5,
					name: 'Participant 5',
					role: 'student',
					profilePicture: 'https://picsum.photos/200/300',
					isSelf: false
				},
				{
					id: 6,
					name: 'Participant 6',
					role: 'student',
					profilePicture: 'https://picsum.photos/200/300',
					isSelf: false
				},
				{
					id: 7,
					name: 'Participant 7',
					role: 'student',
					profilePicture: 'https://picsum.photos/200/300',
					isSelf: false
				},
				{
					id: 8,
					name: 'Participant 8',
					role: 'student',
					profilePicture: 'https://picsum.photos/200/300',
					isSelf: false
				},
				{
					id: 9,
					name: 'Participant 9',
					role: 'student',
					profilePicture: 'https://picsum.photos/200/300',
					isSelf: false
				},
				
			],
			isLecture: true,
        };
		
		if (classRoom.id !== roomId) {
			dispatcher(joinClassRoom(room));
		}
		document.title = room.name;
		return () => {
			dispatcher(leaveClassRoom())
		}

	}, []);


	return (
		<section className={'h-screen w-screen flex flex-col bg-primary'}>
			<NavBar/>
			<ClassRoomBody>
				<Outlet/>
			</ClassRoomBody>
		</section>
	)
}