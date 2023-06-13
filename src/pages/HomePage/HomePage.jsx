import {HomeOutside} from "../../components/HomeOutside/HomeOutside.jsx";
import {BannerPage} from "../../components/BannerPage/BannerPage.jsx";

export const HomePage = () => {
	return (
		<BannerPage banner={'/images/banner-images/home-page-banner.jpg'}>
			<HomeOutside/>
		</BannerPage>
	)
}