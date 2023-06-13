import {LoginForm, BannerPage} from "../../components/";
import BannerImage from '../../assets/banner-images/login-page-banner.jpg'

export const LoginPage = () => {
	return (
		<BannerPage banner={BannerImage} reverse>
			<LoginForm/>
		</BannerPage>
	)
}