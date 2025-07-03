import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../../services/api';
import { getToken } from '../../utils/jwt';
import { useHistory } from 'react-router-dom';

const statusColors = {
    'Pendente': 'bg-yellow-100 text-yellow-800',
    'Em Andamento': 'bg-blue-100 text-blue-800',
    'Concluída': 'bg-green-100 text-green-800',
};

const TarefaList = () => {
    const [tarefas, setTarefas] = useState([]);
    const history = useHistory();
    const usuarioNome = localStorage.getItem('usuarioNome') || 'Usuário';

    useEffect(() => {
        fetchTarefas();
    }, []);

    const fetchTarefas = async () => {
        const token = getToken();
        const data = await getTasks(token);
        setTarefas(data);
    };

    const handleDelete = async (id) => {
        const token = getToken();
        await deleteTask(id, token);
        fetchTarefas();
    };

    const handleVoltar = () => {
        history.push('/nova-tarefa');
    };

    const handleEditar = (id) => {
        history.push(`/editar-tarefa/${id}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('usuarioNome');
        localStorage.removeItem('token');
        history.push('/login');
    };

    const handleConcluir = async (tarefa) => {
        if (tarefa.status === 'Concluída') return;
        const token = getToken();
        await updateTask(tarefa.id, { ...tarefa, status: 'Concluída' }, token);
        fetchTarefas();
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 max-w-5xl w-full mx-auto border border-gray-100">
            <div className="mb-4 flex justify-between items-center">
                <div className="text-sm text-gray-500 font-medium">Bem-vindo, {usuarioNome}!</div>
                <button
                    type="button"
                    onClick={handleLogout}
                    className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition font-medium border border-red-500 shadow-sm flex items-center gap-1 text-sm"
                    title="Sair"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
                    Logout
                </button>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                    <span className="inline-block w-2 h-6 bg-blue-600 rounded mr-2"></span>
                    Lista de Tarefas
                </h2>
                <button
                    onClick={handleVoltar}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition font-medium border border-blue-200 shadow-sm w-full sm:w-auto"
                    title="Voltar para o formulário de tarefas"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    Nova Tarefa
                </button>
            </div>
            <ul className="divide-y divide-gray-100">
                {tarefas.length === 0 && (
                    <li className="py-8 text-center text-gray-400">Nenhuma tarefa cadastrada.</li>
                )}
                {tarefas.map(tarefa => (
                    <li key={tarefa.id} className="flex flex-col md:flex-row md:items-center justify-between py-5 px-2 bg-blue-50 hover:bg-blue-200 transition rounded-lg group gap-2 md:gap-0">
                        <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
                            <span className="text-lg font-semibold text-gray-800 break-words max-w-xs">{tarefa.nome}</span>
                            <span className={`ml-0 sm:ml-4 px-3 py-1 rounded-full text-xs font-bold ${statusColors[tarefa.status] || 'bg-gray-100 text-gray-700'}`}>{tarefa.status}</span>
                            <span className="ml-0 sm:ml-4 text-sm text-gray-500">Início: {tarefa.dataHoraInicio ? tarefa.dataHoraInicio.substring(0, 10) : '--'}</span>
                            <span className="ml-0 sm:ml-4 text-sm text-gray-500">Fim: {tarefa.dataHoraFim ? tarefa.dataHoraFim.substring(0, 10) : '--'}</span>
                        </div>
                        <div className="flex gap-2 mt-3 md:mt-0 md:ml-4 justify-end w-full md:w-auto">
                            <button
                                onClick={() => handleEditar(tarefa.id)}
                                className="flex items-center gap-1 px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition font-medium shadow-sm border border-yellow-400 w-full md:w-auto"
                                title="Editar"
                            >
                                <i className="fas fa-edit"></i>
                            </button>
                            <button
                                onClick={() => handleConcluir(tarefa)}
                                className={`flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium shadow-sm border border-green-500 w-full md:w-auto ${tarefa.status === 'Concluída' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                title="Concluir"
                                disabled={tarefa.status === 'Concluída'}
                            >
                                <i className="fas fa-check"></i>
                            </button>
                            <button
                                onClick={() => handleDelete(tarefa.id)}
                                className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow-sm border border-red-500 w-full md:w-auto"
                                title="Excluir"
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TarefaList;