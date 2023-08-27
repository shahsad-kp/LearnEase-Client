import {axiosAuthorized, axiosInstance} from "./apiConfiguration.js";
import {store} from "../../redux/store.js";
import {login, updateUser} from "../../redux/authSlice/authSlice.js";

const loginUser = async ({email, password}) => {
    try{
        const response = await axiosInstance.post('/auth/login/', {email, password});
        const {access, refresh, user} = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        store.dispatch(login(user))
        return await Promise.resolve(response);
    }
    catch(error){
        return await Promise.reject(error);
    }
}

const registerUser = async ({name, email, password}) => {
    try{
        const response = await axiosInstance.post('/auth/register/', {name, email, password});
        const {access, refresh, user} = response.data;
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh)
        store.dispatch(login(user))
    }
    catch(error){
        console.log(error)
        return await Promise.reject(error);
    }
}

const updateUserApi = async (data) => {
    try{
        const response = await axiosAuthorized.patch('user/update/', data);
        store.dispatch(updateUser(response.data))

        return response.data
    }
    catch(error){
        console.log(error)
        return Promise.reject(error)
    }
}

const verifyEmail = async (token) => {
    try{
        const response = await axiosAuthorized.get(`/auth/verify/${token}/`, {token});
        return await Promise.resolve(response);
    }
    catch(error){
        return await Promise.reject(error);
    }
}

export {loginUser, registerUser, updateUserApi, verifyEmail};
