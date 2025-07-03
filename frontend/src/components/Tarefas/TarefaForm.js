import React, { useState, useEffect } from 'react';
import { createTask, updateTask, getTaskById } from '../../services/api';
import { useHistory, useParams } from 'react-router-dom';
import { getToken } from '../../utils/jwt';

const TarefaForm = ({ tarefa: tarefaProp, onSave, onCancel }) => {
    const [nome, setNome] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [status, setStatus] = useState('Pendente');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [showSucesso, setShowSucesso] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    const usuarioNome = localStorage.getItem('usuarioNome') || 'Usuário';
    const tarefa = tarefaProp;

    useEffect(() => {
        const fetchTarefa = async () => {
            if (id) {
                setCarregando(true);
                try {
                    const token = getToken();
                    const tarefaData = await getTaskById(id, token);
                    setNome(tarefaData.nome);
                    setDataInicio(tarefaData.dataHoraInicio ? tarefaData.dataHoraInicio.substring(0, 10) : '');
                    setDataFim(tarefaData.dataHoraFim ? tarefaData.dataHoraFim.substring(0, 10) : '');
                    setStatus(tarefaData.status);
                } catch (err) {
                    setErro('Erro ao carregar tarefa para edição.');
                } finally {
                    setCarregando(false);
                }
            } else if (tarefaProp) {
                setNome(tarefaProp.nome);
                setDataInicio(tarefaProp.dataHoraInicio ? tarefaProp.dataHoraInicio.substring(0, 10) : '');
                setDataFim(tarefaProp.dataHoraFim ? tarefaProp.dataHoraFim.substring(0, 10) : '');
                setStatus(tarefaProp.status);
            }
        };
        fetchTarefa();
    }, [id, tarefaProp]);

    const toLocalDateTime = (dateStr) => {
        return dateStr ? `${dateStr}T00:00:00` : '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setSucesso('');
        setShowSucesso(false);
        const tarefaData = {
            nome,
            dataHoraInicio: toLocalDateTime(dataInicio),
            dataHoraFim: toLocalDateTime(dataFim),
            status
        };
        const token = getToken();
        try {
            if (id) {
                await updateTask(id, tarefaData, token);
            } else {
                await createTask(tarefaData, token);
                // Limpa o formulário após salvar nova tarefa
                setNome('');
                setDataInicio('');
                setDataFim('');
                setStatus('Pendente');
            }
            setSucesso('Tarefa salva com sucesso!');
            setShowSucesso(true);
            setTimeout(() => setShowSucesso(false), 3000);
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

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('usuarioNome');
        localStorage.removeItem('token');
        history.push('/login');
    };

    if (carregando) {
        return <div className="text-center py-10 text-blue-700 font-bold">Carregando tarefa...</div>;
    }

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {}
            <div
                className={`fixed left-1/2 top-8 z-50 transform -translate-x-1/2 transition-all duration-500 ${showSucesso ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                style={{ minWidth: '260px' }}
            >
                {sucesso && (
                    <div className="text-green-700 font-semibold bg-green-100 rounded p-3 border border-green-200 shadow-lg drop-shadow-lg animate-fade-in-out">
                        {sucesso}
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-6 max-w-4xl w-full mx-auto border border-gray-100">
                <div className="mb-4 flex justify-between items-center">
                    <div className="text-right text-sm text-gray-500 font-medium">Bem-vindo, {usuarioNome}!</div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium border border-red-500 shadow-sm"
                        title="Sair"
                    >
                        Logout
                    </button>
                </div>
                {erro && (
                    <div className="mb-4 text-red-600 font-semibold bg-red-100 rounded p-2 border border-red-200">{erro}</div>
                )}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                    <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
                        <span className="inline-block w-2 h-6 bg-blue-600 rounded mr-2"></span>
                        {tarefa ? 'Editar Tarefa' : 'Nova Tarefa'}
                    </h2>
                    <button
                        type="button"
                        onClick={handleVisualizarLista}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition font-medium border border-blue-200 shadow-sm w-full sm:w-auto"
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
                <div className="flex flex-col sm:flex-row gap-4">
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
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center gap-2 px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium shadow-sm border border-gray-300 w-full sm:w-auto"
                        title="Cancelar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition font-medium shadow-sm border border-blue-700 w-full sm:w-auto"
                        title="Salvar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TarefaForm;