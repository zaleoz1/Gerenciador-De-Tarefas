import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const register = (name, login, password) => {
    return axios.post(API_URL + 'register', {
        name,
        login,
        password
    });
};

const login = (login, password) => {
    return axios.post(API_URL + 'login', {
        login,
        password
    }).then(response => {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const auth = {
    register,
    login,
    logout,
    getCurrentUser
};

export default auth;