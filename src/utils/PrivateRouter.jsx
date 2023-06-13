import {Navigate, Route} from "react-router-dom";

// eslint-disable-next-line no-unused-vars,react/prop-types
function PrivateRoute({children, ...rest}) {
    const auth = false;
    // TODO: check authenticated or not
    return auth ? <Route {...rest} /> : <Navigate to="/login"/>;
}

export default PrivateRoute;