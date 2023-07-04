import {LoginForm, BannerPage} from "../../components/";
import BannerImageBig from '../../assets/banner-images/login-page-banner.jpg';
import BannerImageSmall from '../../assets/banner-images/login-page-banner-small.jpg'

export const LoginPage = () => {
	return (
		<BannerPage bigBanner={BannerImageBig} smallBanner={BannerImageSmall} reverse>
			<LoginForm/>
		</BannerPage>
	)
}