import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../../services/api';

const TarefaForm = ({ tarefa, onSave, onCancel }) => {
    const [nome, setNome] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [status, setStatus] = useState('Pendente');

    useEffect(() => {
        if (tarefa) {
            setNome(tarefa.nome);
            setDataInicio(tarefa.dataInicio);
            setDataFim(tarefa.dataFim);
            setStatus(tarefa.status);
        }
    }, [tarefa]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const tarefaData = { nome, dataInicio, dataFim, status };
        if (tarefa) {
            updateTask(tarefa.id, tarefaData).then(onSave);
        } else {
            createTask(tarefaData).then(onSave);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">{tarefa ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
            <div>
                <label className="block text-gray-700 mb-1">Nome da Tarefa:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1">Data de Início:</label>
                <input
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1">Data de Fim:</label>
                <input
                    type="date"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                    required
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div>
                <label className="block text-gray-700 mb-1">Status:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <option value="Pendente">Pendente</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluída">Concluída</option>
                </select>
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Salvar</button>
            </div>
        </form>
    );
};

export default TarefaForm;