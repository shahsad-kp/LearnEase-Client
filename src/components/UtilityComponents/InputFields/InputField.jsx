import {bannerPageInputClass} from "../../styles.js";

// eslint-disable-next-line react/prop-types
export const InputField = ({type, ...props}) => {
	if (!type){
		type = 'text'
	}

	return (
		<input type={type} className={bannerPageInputClass} {...props}/>
	)
}