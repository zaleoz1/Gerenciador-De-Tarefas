package com.example.gerenciadordetarefas.service;

import com.example.gerenciadordetarefas.dto.TarefaDTO;
import com.example.gerenciadordetarefas.model.Tarefa;
import com.example.gerenciadordetarefas.repository.TarefaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {
    @Autowired
    private TarefaRepository tarefaRepository;

    public List<Tarefa> listarTarefas() {
        return tarefaRepository.findAll();
    }

    public Tarefa criarTarefa(TarefaDTO tarefaDTO) {
        Tarefa tarefa = new Tarefa();
        tarefa.setNome(tarefaDTO.getNome());
        tarefa.setDataHoraInicio(tarefaDTO.getDataHoraInicio());
        tarefa.setDataHoraFim(tarefaDTO.getDataHoraFim());
        tarefa.setStatus(tarefaDTO.getStatus());
        // tarefa.setUsuario(...); // Defina o usuário conforme sua lógica
        return tarefaRepository.save(tarefa);
    }

    public Tarefa editarTarefa(Long id, TarefaDTO tarefaDTO) {
        Optional<Tarefa> optTarefa = tarefaRepository.findById(id);
        if (optTarefa.isPresent()) {
            Tarefa tarefa = optTarefa.get();
            tarefa.setNome(tarefaDTO.getNome());
            tarefa.setDataHoraInicio(tarefaDTO.getDataHoraInicio());
            tarefa.setDataHoraFim(tarefaDTO.getDataHoraFim());
            tarefa.setStatus(tarefaDTO.getStatus());
            // tarefa.setUsuario(...); // Atualize o usuário se necessário
            return tarefaRepository.save(tarefa);
        }
        return null;
    }

    public void excluirTarefa(Long id) {
        tarefaRepository.deleteById(id);
    }
}