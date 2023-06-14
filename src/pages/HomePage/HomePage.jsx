import {HomeOutside} from "../../components/";
import {BannerPage} from "../../components/";
import BannerImage from '../../assets/banner-images/home-page-banner.jpg'
import {useSelector} from "react-redux";

export const HomePage = () => {
	const user = useSelector(state => state.auth.user)

	if (user){
		return (
			<BannerPage banner={BannerImage}>
				Hello World
			</BannerPage>
		)
	}else{
		return (
			<BannerPage banner={BannerImage}>
				<HomeOutside/>
			</BannerPage>
		)
	}
}