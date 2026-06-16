import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log(`[API Response] ${response.config.method.toUpperCase()} ${response.config.url}`, response.status);
        return response;
    },
    (error) => {
        console.error('[API Response Error]', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const getData = async () => {
    const response = await api.get('/courses');
    return response.data;
};

export const addData = async (courseData) => {
    const response = await api.post('/courses', courseData);
    return response.data;
};

export const updateData = async (id, updatedData) => {
    const response = await api.put(`/courses/${id}`, updatedData);
    return response.data;
};

export const deleteData = async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
};

export default api;
