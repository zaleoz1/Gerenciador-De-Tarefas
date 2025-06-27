import React, { useState, useEffect } from 'react';
import { createTarefa, updateTarefa } from '../../services/api';

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
            updateTarefa(tarefa.id, tarefaData).then(onSave);
        } else {
            createTarefa(tarefaData).then(onSave);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome da Tarefa:</label>
                <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Data/Hora de Início:</label>
                <input
                    type="datetime-local"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Data/Hora de Fim:</label>
                <input
                    type="datetime-local"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pendente">Pendente</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Concluída">Concluída</option>
                </select>
            </div>
            <button type="submit">{tarefa ? 'Atualizar' : 'Criar'} Tarefa</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

export default TarefaForm;