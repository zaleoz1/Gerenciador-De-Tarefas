import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../../services/api';
import { useHistory } from 'react-router-dom';
import { getToken } from '../../utils/jwt';

const TarefaForm = ({ tarefa, onSave, onCancel }) => {
    const [nome, setNome] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [status, setStatus] = useState('Pendente');
    const [erro, setErro] = useState('');
    const history = useHistory();
    const usuarioNome = localStorage.getItem('usuarioNome') || 'Usuário';

    useEffect(() => {
        if (tarefa) {
            setNome(tarefa.nome);
            setDataInicio(tarefa.dataHoraInicio ? tarefa.dataHoraInicio.substring(0, 10) : '');
            setDataFim(tarefa.dataHoraFim ? tarefa.dataHoraFim.substring(0, 10) : '');
            setStatus(tarefa.status);
        }
    }, [tarefa]);

    // Função para converter data (YYYY-MM-DD) para LocalDateTime (YYYY-MM-DDT00:00:00)
    const toLocalDateTime = (dateStr) => {
        return dateStr ? `${dateStr}T00:00:00` : '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        const tarefaData = {
            nome,
            dataHoraInicio: toLocalDateTime(dataInicio),
            dataHoraFim: toLocalDateTime(dataFim),
            status
        };
        const token = getToken();
        try {
            if (tarefa) {
                await updateTask(tarefa.id, tarefaData, token);
            } else {
                await createTask(tarefaData, token);
            }
            if (onSave) onSave();
        } catch (err) {
            let msg = 'Erro ao salvar tarefa. Verifique os dados e tente novamente.';
            if (err.response && err.response.data && err.response.data.message) {
                msg = err.response.data.message;
            } else if (err.response && err.response.data) {
                msg = JSON.stringify(err.response.data);
            }
            setErro(msg);
        }
    };

    const handleVisualizarLista = () => {
        history.push('/tarefas');
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 space-y-6 max-w-lg mx-auto border border-gray-100">
            <div className="mb-4 text-right text-sm text-gray-500 font-medium">Bem-vindo, {usuarioNome}!</div>
            {erro && (
                <div className="mb-4 text-red-600 font-semibold bg-red-100 rounded p-2 border border-red-200">{erro}</div>
            )}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                    <span className="inline-block w-2 h-6 bg-blue-600 rounded mr-2"></span>
                    {tarefa ? 'Editar Tarefa' : 'Nova Tarefa'}
                </h2>
                <button
                    type="button"
                    onClick={handleVisualizarLista}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition font-medium border border-blue-200 shadow-sm"
                    title="Visualizar lista de tarefas"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    Visualizar Lista
                </button>
            </div>
            <div>
                <label className="block text-gray-700 mb-1 font-medium">Nome da Tarefa</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    placeholder="Digite o nome da tarefa"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                />
            </div>
            <div className="flex  gap-4">
                <div className="flex-1">
                    <label className="block text-gray-700 mb-1 font-medium">Data de Início</label>
                    <input
                        type="date"
                        value={dataInicio}
                        onChange={(e) => setDataInicio(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-gray-700 mb-1 font-medium">Data de Fim</label>
                    <input
                        type="date"
                        value={dataFim}
                        onChange={(e) => setDataFim(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                    />
                </div>
            </div>
            <div>
                <label className="block text-gray-700 mb-1 font-medium">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-sm"
                >
                    <option value="Pendente">Pendente</option>
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Concluída">Concluída</option>
                </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex items-center gap-2 px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium shadow-sm border border-gray-300"
                    title="Cancelar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium shadow-sm border border-blue-700"
                    title="Salvar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Salvar
                </button>
            </div>
        </form>
    );
};

export default TarefaForm;