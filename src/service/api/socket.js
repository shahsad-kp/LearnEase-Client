const baseURL = import.meta.env.VITE_BACKEND_URL;
const wsBaseUrl = `wss://${baseURL}/ws/`

export {
    wsBaseUrl,
};