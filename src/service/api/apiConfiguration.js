import axios from "axios";
import {store} from "../../redux/store.js";
import {logout} from "../../redux/authSlice/authSlice.js";


const baseURL = 'http://35.232.201.4/api/';
const imageBaseURL = 'http://35.232.201.4';

const axiosAuthorized = axios.create({
    baseURL: baseURL,
});

const axiosInstance = axios.create({
    baseURL: baseURL,
});

axiosAuthorized.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
});

axiosAuthorized.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            return refreshToken().then(access => {
                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return axiosAuthorized(originalRequest);
            }).catch(error => {
                return Promise.reject(error);
            })
        }
        return Promise.reject(error);
    }
);

const refreshToken = async () => {
    try{
        const res = await axiosInstance.post(
        'auth/token/refresh/',
        {
                refresh: localStorage.getItem('refreshToken')
            }
        )
        const {access} = res.data;
        localStorage.setItem('accessToken', access);
        return access
    }
    catch (e) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        store.dispatch(logout())
        return Promise.reject(e);
    }
}
export {axiosAuthorized, axiosInstance, imageBaseURL, refreshToken};
