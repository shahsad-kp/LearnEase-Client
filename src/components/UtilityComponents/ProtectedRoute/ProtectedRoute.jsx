import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({children}) => {
    const user = useSelector(state => state.auth.user);
    const history = useLocation();

    if (user) {
        return children;
    } else {
        return <Navigate to={'/login'} state={{from: history.pathname}}/>
    }
}