import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import auth from '../../services/auth';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        try {
            await auth.register(name, login, password);
            history.push('/login');
        } catch (err) {
            setError('Erro ao registrar. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-2 overflow-hidden">
            <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl h-auto md:h-[600px]">
                {}
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center bg-gradient-to-br from-white to-[#f3e5f5] p-6 md:p-10 relative">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Já tem uma conta?</h2>
                        <p className="text-gray-600 mb-6 md:mb-8">Lorem Ipsum has been the industry's standard dummy text ever since the</p>
                        <button
                            onClick={() => history.push('/login')}
                            className="w-full md:w-auto px-8 py-3 border border-gray-400 rounded-full text-gray-800 font-semibold hover:bg-gray-100 transition text-lg"
                        >
                            Faça login
                        </button>
                    </div>
                </div>
                {}
                <div className="w-full md:w-1/2 h-full bg-[#23242a] flex flex-col justify-center items-center p-6 md:p-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-center">Cadastro</h2>
                    <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
                        {error && <p className="text-red-400 text-center mb-2">{error}</p>}
                        <input
                            type="text"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#35363b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="E-mail"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#35363b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-gray-400"
                        />
                        <input
                            type="password"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#35363b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-gray-400"
                        />
                        <input
                            type="password"
                            placeholder="Confirmação de Senha"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#35363b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-gray-400"
                        />
                        <button type="submit" className="w-full py-3 rounded-md bg-gradient-to-r from-violet-500 to-pink-200 text-white font-semibold text-lg transition hover:from-violet-600 hover:to-pink-300">Cadastrar</button>
                    </form>
                    <div className="flex items-center w-full max-w-xs my-6">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;