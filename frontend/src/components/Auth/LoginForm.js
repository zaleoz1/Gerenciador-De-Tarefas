import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/auth';

const LoginForm = () => {
    const [loginInput, setLoginInput] = useState('');
    const [senha, setSenha] = useState('');
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
            setErro('Login inválido. Verifique seu usuário e senha.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-2 overflow-hidden">
            <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl h-auto md:h-[600px]">
                {/* Lado esquerdo: Login */}
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
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-[#35363b] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400 placeholder-gray-400"
                        />
                        <button type="submit" className="w-full py-3 rounded-md bg-gradient-to-r from-violet-500 to-pink-200 text-white font-semibold text-lg transition hover:from-violet-600 hover:to-pink-300">Entrar</button>
                    </form>
                    <div className="flex items-center w-full max-w-xs my-6">
                        <div className="flex-grow h-px bg-gray-600" />
                        <span className="mx-2 text-gray-400">ou</span>
                        <div className="flex-grow h-px bg-gray-600" />
                    </div>
                    <div className="flex space-x-6 justify-center">
                        <button className="bg-[#23242a] border border-gray-500 rounded-full p-3 hover:bg-[#35363b] transition">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.125-2.789-6.125-6.25s2.75-6.25 6.125-6.25c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.57-3.891-2.539-6.656-2.539-5.523 0-10 4.477-10 10s4.477 10 10 10c5.75 0 9.547-4.031 9.547-9.719 0-.656-.07-1.148-.156-1.484z"/></svg>
                        </button>
                        <button className="bg-[#23242a] border border-gray-500 rounded-full p-3 hover:bg-[#35363b] transition">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.632.771-1.632 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                        </button>
                    </div>
                </div>
                {/* Lado direito: Cadastro convite */}
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