import {BannerPage, SignupForm} from "../../components/";
import bigBannerImage from "../../assets/banner-images/signup-page-banner.jpg";
import smallBannerImage from "../../assets/banner-images/signup-page-banner-small.jpg";

export const SignupPage = () => {
	return (
		<BannerPage bigBanner={bigBannerImage} smallBanner={smallBannerImage}>
			<SignupForm/>
		</BannerPage>
	)
}