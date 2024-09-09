// src/api.js

import axios from 'axios';
import { environment } from './environments/environment';
// Create an Axios instance
const api = axios.create({
    baseURL: environment.APP_BASE_URL // Base URL for your API
});

// Request interceptor to add Authorization token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => {
        console.log('response is', response)
        return response.data

    },


    (error) => {
        // Handle errors (e.g., redirect to login if unauthorized)
        if (error.response && error.response.status === 401) {
            // Redirect to login page or show an error message
            window.location.href = '/login'; // Adjust the redirection as needed
        }
        return Promise.reject(error);
    }
);

export default api;
