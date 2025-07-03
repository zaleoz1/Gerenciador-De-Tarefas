import axios from 'axios';
import { setToken } from '../utils/jwt';

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
            setToken(response.data.token); // Salva o token JWT corretamente
            // Salva o nome do usuário para exibição
            if (response.data.nome || response.data.nomeCompleto || response.data.username) {
                localStorage.setItem('usuarioNome', response.data.nome || response.data.nomeCompleto || response.data.username);
            }
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