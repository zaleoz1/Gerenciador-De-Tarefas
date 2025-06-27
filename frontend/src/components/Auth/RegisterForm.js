import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../../services/auth';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await register({ name, login, password });
            history.push('/login');
        } catch (err) {
            setError('Erro ao registrar. Tente novamente.');
        }
    };

    return (
        <div>
            <h2>Registrar</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome Completo:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Login:</label>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default RegisterForm;