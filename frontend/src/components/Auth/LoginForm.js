import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/auth';

const LoginForm = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(loginData);
            history.push('/tarefas'); // Redireciona para a lista de tarefas após login
        } catch (err) {
            setError('Login falhou. Verifique suas credenciais.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Login:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default LoginForm;