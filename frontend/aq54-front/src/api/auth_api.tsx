import axios from 'axios'

const API_URL = 'http://localhost:3000/auth';

export const signUp = async (email: string,  password: string) =>{
    return await axios.post(`${API_URL}/signup`, { email, password });
}

export const signIn = async (email: string, password: string) => {
    return await axios.post(`${API_URL}/login`, { email, password });
}

export const signOut = async () => {
    return axios.post(`${API_URL}/logout`);
}