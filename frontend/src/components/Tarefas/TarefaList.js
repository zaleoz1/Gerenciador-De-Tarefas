import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../../services/api';
import { getToken } from '../../utils/jwt';

const TarefaList = () => {
    const [tarefas, setTarefas] = useState([]);

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

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Lista de Tarefas</h2>
            <ul className="space-y-3">
                {tarefas.map(tarefa => (
                    <li key={tarefa.id} className="flex items-center justify-between bg-blue-50 rounded p-3 hover:bg-blue-100 transition">
                        <span className="text-gray-800 font-medium">{tarefa.nome}</span>
                        <button onClick={() => handleDelete(tarefa.id)} className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Excluir</button>
                        {/* Botão para editar pode ser adicionado aqui */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TarefaList;