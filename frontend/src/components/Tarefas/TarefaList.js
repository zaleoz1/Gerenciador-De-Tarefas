import React, { useEffect, useState } from 'react';
import { getTarefas, deleteTarefa } from '../../services/api';

const TarefaList = () => {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        fetchTarefas();
    }, []);

    const fetchTarefas = async () => {
        const response = await getTarefas();
        setTarefas(response.data);
    };

    const handleDelete = async (id) => {
        await deleteTarefa(id);
        fetchTarefas();
    };

    return (
        <div>
            <h2>Lista de Tarefas</h2>
            <ul>
                {tarefas.map(tarefa => (
                    <li key={tarefa.id}>
                        <span>{tarefa.nome}</span>
                        <button onClick={() => handleDelete(tarefa.id)}>Excluir</button>
                        {/* Botão para editar pode ser adicionado aqui */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TarefaList;