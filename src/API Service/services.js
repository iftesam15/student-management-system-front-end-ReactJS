import api from "../api";

export const getAll = (endpoint, params = {}) => {
    return api.get(endpoint, { params });
};

// Generic GET by ID
export const getById = (endpoint, id) => {
    return api.get(`${endpoint}/${id}`);
};

// Generic POST (Create)
export const create = (endpoint, data) => {
    return api.post(endpoint, data);
};

// Generic PUT (Update)
export const update = (endpoint, id, data) => {
    return api.put(`${endpoint}/${id}`, data);
};

// Generic DELETE
export const remove = (endpoint, id) => {
    return api.delete(`${endpoint}/${id}`);
};