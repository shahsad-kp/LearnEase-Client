import {HomeOutside} from "../../components/";
import {BannerPage} from "../../components/";
import BannerImage from '../../assets/banner-images/home-page-banner.jpg'
import {useSelector} from "react-redux";
import NavBar from "../../components/LandingPage/NavBar/NavBar.jsx";

export const HomePage = () => {
	const user = useSelector(state => state.auth.user)

	if (user){
		return (
			<div className={'w-screen h-screen'}>
				<NavBar/>
			</div>
		)
	}else{
		return (
			<BannerPage banner={BannerImage}>
				<HomeOutside/>
			</BannerPage>
		)
	}
}