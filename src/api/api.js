// utils/api.js or services/httpService.js
import axios from "axios";
import { API_BASE_URL } from "./config";
import platform from "platform";
import { auth } from "./apiEndpoints";

// API base URL (can be environment-specific) It's best to store the base URL in your .env file

// Create an axios instance with headers
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Axios instance without token
const noAuthApi = axios.create({
    baseURL: API_BASE_URL, // Your API base URL
    headers: {
        "Accept": "application/json", // Default headers
    },
});

const getDeviceDetails = () => {
    return {
        app: "web",
        os: platform.os?.family || "Unknown",
        device: platform.product || "Unknown",
        device_type: platform.manufacturer || "desktop",
        ip_address: null, // Can be fetched from an external API if needed
        browser_version: platform.version || "Unknown",
        os_version: platform.os?.version || "Unknown",
        browser_name: platform.name || "Unknown",
    };
};


api.interceptors.request.use(
    async (config) => {
        // Add Authorization token
        const token = localStorage.getItem("accessToken");
        if (token) {
            //config.headers.token = 'Bearer_' + token;
            config.headers["Authorization"] = `Bearer ${token}`;
        }

        // Add device details
        const deviceDetails = getDeviceDetails();
        config.headers.device = JSON.stringify(deviceDetails);

        return config;
    },
    (error) => Promise.reject(error) // Handle request errors
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 error
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    // Call refresh token API
                    const response = await axios.post(`${auth.refreshToken}`, { refreshToken: refreshToken });
                    const newToken = response.data.authToken;

                    // Update tokens in localStorage
                    localStorage.setItem("token", newToken);

                    // Retry the original request with the new token
                    originalRequest.headers.token = newToken;
                    return api(originalRequest);
                } catch (refreshError) {
                    if (refreshError.response?.status === 401) {
                        const rememberMeData = localStorage?.getItem('rememberMeData');
                        // If refresh token also fails, navigate to login
                        localStorage.clear(); // Clear all stored tokens
                        if (rememberMeData) {
                            localStorage.setItem('rememberMeData', rememberMeData);
                        }
                        window.location.href = "/login";
                    }
                    return Promise.reject(refreshError);
                }
            } else {
                const rememberMeData = localStorage.getItem('rememberMeData');
                // No refresh token available
                localStorage.clear();
                if (rememberMeData) {
                    localStorage.setItem('rememberMeData', rememberMeData);
                }
                window.location.href = "/login";
            }
        }

        // Handle other errors (e.g., 500)
        if (error.response?.status === 500) {
            console.error("Server error! Please try again later.");
        }

        return Promise.reject(error);
    }
);

// Get Request without re-adding headers in the individual request
export const getRequest = async (endpoint, params = {}) => {

    try {
        const response = await api.get(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error("GET Request failed", error);
        throw error;
    }
};

// Get Request with ID (similar to your `getRequestByType`)
export const getRequestById = async (endpoint, id, params = {}) => {
    try {
        const response = await api.get(`${endpoint}${id}`, { params });
        return response.data;
    } catch (error) {
        console.error("GET by ID Request failed", error);
        throw error;
    }
};

// Post Request
export const postRequest = async (endpoint, payload, params = {}) => {
    try {
        const response = await api.post(endpoint, payload, { params });
        return response.data;
    } catch (error) {
        console.error("POST Request failed", error);
        throw error;
    }
};

// Put Request
export const putRequestCustomHeader = async (url, payload, customHeaders = {}) => {
    try {
        const response = await noAuthApi.put(url, payload, {
            headers: {
                ...customHeaders, // Override or add custom headers
            },
        });
        return response.data;
    } catch (error) {
        console.error("PUT Request failed", error);
        throw error;
    }
};

// Delete Request
export const deleteRequest = async (endpoint, params = {}) => {
    try {
        const response = await api.delete(endpoint, { params });
        return response.data;
    } catch (error) {
        console.error("DELETE Request failed", error);
        throw error;
    }
};

// Patch Request
export const patchRequest = async (endpoint, payload) => {
    try {
        const response = await api.patch(endpoint, payload);
        return response.data;
    } catch (error) {
        console.error("PATCH Request failed", error);
        throw error;
    }
};

// put Request
export const putRequest = async (endpoint, payload) => {
    try {
        const response = await api.put(endpoint, payload);
        return response.data;
    } catch (error) {
        console.error("PATCH Request failed", error);
        throw error;
    }
};

