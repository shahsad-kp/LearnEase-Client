import {BannerPage, HomeBody, HomeOutside} from "../../components/";
import BannerImage from '../../assets/banner-images/home-page-banner.jpg'
import {useSelector} from "react-redux";

export const HomePage = () => {
	const user = useSelector(state => state.auth.user)

	if (user){
		return (
			<HomeBody/>
		)
	}else{
		return (
			<BannerPage banner={BannerImage}>
				<HomeOutside/>
			</BannerPage>
		)
	}
}