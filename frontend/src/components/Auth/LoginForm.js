import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/auth';

const LoginForm = () => {
    const [loginInput, setLoginInput] = useState('');
    const [senha, setSenha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [erro, setErro] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        if (!loginInput || !senha) {
            setErro('Preencha todos os campos.');
            return;
        }
        try {
            await login(loginInput, senha);
            history.push('/tarefas');
        } catch (err) {
            if (err && err.response && (err.response.status === 401 || err.response.status === 403)) {
                setErro('Usuário ou senha incorretos.');
            } else {
                setErro('Erro ao tentar fazer login. Tente novamente.');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-2 overflow-hidden">
            <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl h-auto md:h-[600px]">
                {}
                <div className="w-full md:w-1/2 h-full bg-[#23242a] flex flex-col justify-center items-center p-6 md:p-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 text-center">Fazer login</h2>
                    <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
                        {erro && <p className="text-red-400 text-center mb-2">{erro}</p>}
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="E-mail"
                            value={loginInput}
                            onChange={e => setLoginInput(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#35363b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-gray-400"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={e => setSenha(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-[#35363b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-gray-400 pr-16"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 text-sm"
                                tabIndex={-1}
                            >
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </button>
                        </div>
                        <button type="submit" className="w-full py-3 rounded-md bg-gradient-to-r from-violet-500 to-pink-200 text-white font-semibold text-lg transition hover:from-violet-600 hover:to-pink-300">Entrar</button>
                    </form>
                    <div className="flex items-center w-full max-w-xs my-6"> 
                    </div>
                </div>
                {}
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center bg-gradient-to-br from-white to-[#d1c4e9] p-6 md:p-10 relative">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Não tem uma conta?</h2>
                        <p className="text-gray-600 mb-6 md:mb-8">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        <button
                            onClick={() => history.push('/register')}
                            className="w-full md:w-auto px-8 py-3 border border-gray-400 rounded-full text-gray-800 font-semibold hover:bg-gray-100 transition text-lg"
                        >
                            Cadastre-se
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;