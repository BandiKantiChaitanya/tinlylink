import axios from "axios";

const API_URL=import.meta.env.VITE_BASE_URL

const API = `${API_URL}/api`;

export const getLinks = () => axios.get(`${API}/links`);
export const createLink = (payload) => axios.post(`${API}/links`, payload);
export const deleteLink = (code) => axios.delete(`${API}/links/${code}`);
export const getLinkStats = (code) => axios.get(`${API}/links/${code}`);
