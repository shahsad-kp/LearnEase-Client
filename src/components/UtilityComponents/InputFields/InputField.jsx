import {bannerPageInputClass} from "../../styles.js";

// eslint-disable-next-line react/prop-types
export const InputField = ({type, classNames = '', ...props}) => {
	if (!type){
		type = 'text'
	}
	if (classNames){
		classNames = ' ' + classNames
	}

	return (
		<input type={type} className={bannerPageInputClass+ '' + classNames} {...props}/>
	)
}