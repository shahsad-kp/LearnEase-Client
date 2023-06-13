// eslint-disable-next-line react/prop-types
export const BannerPage = ({children, banner, reverse}) => {
    return (<div
        className={'bg-secondary flex justify-center align-middle h-screen' + (reverse ? ' flex-row-reverse' : ' flex-row')}>
        <section className={'hidden md:flex w-2/4 justify-center'}>
            <img className={'object-contain w-3/4'} src={banner} alt={'Banner'}/>
        </section>
        {children}
    </div>)
}