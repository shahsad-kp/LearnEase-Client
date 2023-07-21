import {ComponentsController} from "../../../GeneralComponents/ComponentsController/ComponentsController.jsx";

// eslint-disable-next-line react/prop-types
export const LargeScreenLeftController = ({selected, setSelected}) => {
	return (
		<div className={'p-2 bg-secondary w-full shadow rounded flex flex-row justify-evenly'}>
			<ComponentsController selected={selected} setSelected={setSelected}/>
		</div>
	)
}