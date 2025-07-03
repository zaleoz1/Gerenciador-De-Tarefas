import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

export const register = (name, login, password) => {
    return axios.post(API_URL + 'register', {
        nomeCompleto: name,
        login,
        senha: password
    });
};

export const login = (login, password) => {
    return axios.post(API_URL + 'login', {
        login,
        senha: password // Corrija aqui!
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const auth = {
    register,
    login,
    logout,
    getCurrentUser
};

export default auth;