package com.example.gerenciadordetarefas.repository;

import com.example.gerenciadordetarefas.model.Tarefa;
import com.example.gerenciadordetarefas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
    List<Tarefa> findByUsuario(Usuario usuario);
}
