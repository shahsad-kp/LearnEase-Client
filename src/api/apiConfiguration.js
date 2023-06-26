import axios from "axios";
import store from "../redux/store.js";
import {logout} from "../redux/authSlice/authSlice.js";


const baseURL = 'http://localhost:8000/api/';
const imageBaseURL = 'http://localhost:8000';

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

            return axiosAuthorized
                .post('auth/token/refresh/', {refresh: localStorage.getItem('refreshToken')})
                .then((res) => {
                    const {accessToken, refreshToken} = res.data;

                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);

                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosAuthorized(originalRequest);
                })
                .catch((error) => {
                    localStorage.removeItem('accessToken')
                    localStorage.removeItem('refreshToken')
                    store.dispatch(logout())
                    return Promise.reject(error);
                });
        }

        return Promise.reject(error);
    }
);

export {axiosAuthorized, axiosInstance, imageBaseURL};
