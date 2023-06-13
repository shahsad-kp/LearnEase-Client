import {BannerPage, SignupForm} from "../../components/";
import BannerImage from "../../assets/banner-images/signup-page-banner.jpg";

export const SignupPage = () => {
	return (
		<BannerPage banner={BannerImage}>
			<SignupForm/>
		</BannerPage>
	)
}