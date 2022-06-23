import axios from 'axios';

const api = axios.create({
    baseURL: 'https://628525a23060bbd3474595aa.mockapi.io/',
});

export default api;