import {BannerPage, HomeBody, HomeOutside, NavBar} from "../../components/";
import bigBannerImage from '../../assets/banner-images/home-page-banner.jpg';
import smallBannerImage from '../../assets/banner-images/home-page-banner-small.jpg';
import {useSelector} from "react-redux";

export const HomePage = () => {
    const user = useSelector(state => state.auth.user)

    if (user) {
        return (
            <div className={'w-screen min-h-screen md:h-screen bg-primary flex flex-col'}>
                <NavBar/>
                <HomeBody/>
            </div>
        )
    } else {
        return (
            <BannerPage bigBanner={bigBannerImage} smallBanner={smallBannerImage}>
                <HomeOutside/>
            </BannerPage>
        )
    }
}