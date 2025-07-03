import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // URL base da API

// Interceptor para tratar token expirado ou inválido
axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            localStorage.removeItem('user');
            localStorage.removeItem('usuarioNome');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Função para registrar um novo usuário
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

// Função para fazer login
export const loginUser = async (loginData) => {
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    return response.data;
};

// Função para criar uma nova tarefa
export const createTask = async (taskData, token) => {
    const response = await axios.post(`${API_URL}/tarefas`, taskData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Função para listar tarefas
export const getTasks = async (token) => {
    const response = await axios.get(`${API_URL}/tarefas`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Função para editar uma tarefa
export const updateTask = async (taskId, taskData, token) => {
    const response = await axios.put(`${API_URL}/tarefas/${taskId}`, taskData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Função para excluir uma tarefa
export const deleteTask = async (taskId, token) => {
    const response = await axios.delete(`${API_URL}/tarefas/${taskId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};