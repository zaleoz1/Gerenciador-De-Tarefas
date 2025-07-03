package com.example.gerenciadordetarefas.service;

import com.example.gerenciadordetarefas.dto.TarefaDTO;
import com.example.gerenciadordetarefas.model.Tarefa;
import com.example.gerenciadordetarefas.model.Usuario;
import com.example.gerenciadordetarefas.repository.TarefaRepository;
import com.example.gerenciadordetarefas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarefaService {
    @Autowired
    private TarefaRepository tarefaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Tarefa> listarTarefas() {
        return tarefaRepository.findAll();
    }

    public Tarefa criarTarefa(TarefaDTO tarefaDTO) {
        Tarefa tarefa = new Tarefa();
        tarefa.setNome(tarefaDTO.getNome());
        tarefa.setDataHoraInicio(tarefaDTO.getDataHoraInicio());
        tarefa.setDataHoraFim(tarefaDTO.getDataHoraFim());
        tarefa.setStatus(tarefaDTO.getStatus());
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Usuario usuario = usuarioRepository.findByLogin(username).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        tarefa.setUsuario(usuario);
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
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            Usuario usuario = usuarioRepository.findByLogin(username).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            tarefa.setUsuario(usuario);
            return tarefaRepository.save(tarefa);
        }
        return null;
    }

    public void excluirTarefa(Long id) {
        tarefaRepository.deleteById(id);
    }
}