import {BannerPage, HomeBody, HomeOutside, NavBar} from "../../components/";
import BannerImage from '../../assets/banner-images/home-page-banner.jpg'
import {useSelector} from "react-redux";

export const HomePage = () => {
	const user = useSelector(state => state.auth.user)

	if (user){
		return (
			<div className={'w-screen h-screen bg-primary flex flex-col'}>
				<NavBar/>
				<HomeBody/>
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