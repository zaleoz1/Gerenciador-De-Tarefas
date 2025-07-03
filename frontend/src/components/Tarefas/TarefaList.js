import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../../services/api';
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

    return (
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl mx-auto border border-gray-100">
            <div className="mb-4 text-right text-sm text-gray-500 font-medium">Bem-vindo, {usuarioNome}!</div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                    <span className="inline-block w-2 h-6 bg-blue-600 rounded mr-2"></span>
                    Lista de Tarefas
                </h2>
                <button
                    onClick={handleVoltar}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition font-medium border border-blue-200 shadow-sm"
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
                    <li key={tarefa.id} className="flex flex-col md:flex-row md:items-center justify-between py-5 px-2 hover:bg-blue-50 transition rounded-lg group">
                        <div className="flex-1 flex flex-col md:flex-row md:items-center gap-2">
                            <span className="text-lg font-semibold text-gray-800">{tarefa.nome}</span>
                            <span className={`ml-0 md:ml-4 px-3 py-1 rounded-full text-xs font-bold ${statusColors[tarefa.status] || 'bg-gray-100 text-gray-700'}`}>{tarefa.status}</span>
                            <span className="ml-0 md:ml-4 text-sm text-gray-500">Início: {tarefa.dataInicio}</span>
                            <span className="ml-0 md:ml-4 text-sm text-gray-500">Fim: {tarefa.dataFim}</span>
                        </div>
                        <div className="flex gap-2 mt-3 md:mt-0 md:ml-4 justify-end">
                            {/* Botão de editar pode ser adicionado aqui */}
                            <button
                                onClick={() => handleDelete(tarefa.id)}
                                className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow-sm border border-red-500"
                                title="Excluir"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TarefaList;