import {HomeOutside} from "../../components/";
import {BannerPage} from "../../components/";
import BannerImage from '../../assets/banner-images/home-page-banner.jpg'

export const HomePage = () => {
	return (
		<BannerPage banner={BannerImage}>
			<HomeOutside/>
		</BannerPage>
	)
}