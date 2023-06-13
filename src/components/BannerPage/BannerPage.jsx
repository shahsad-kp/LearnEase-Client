export const BannerPage = ({children, banner}) => {
    return (<div className={'bg-secondary flex flex-row justify-center align-middle h-screen'}>
        <section className={'hidden md:flex w-2/4 justify-center'}>
            <img className={'object-contain w-3/4'} src={banner} alt={'Banner'}/>
        </section>
        <section className={'w-full md:w-2/4 flex flex-col justify-center items-center gap-16 p-8'}>
			{children}
        </section>
    </div>)
}