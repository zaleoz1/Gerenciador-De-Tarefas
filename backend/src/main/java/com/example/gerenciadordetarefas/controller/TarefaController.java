package com.example.gerenciadordetarefas.controller;

import com.example.gerenciadordetarefas.dto.TarefaDTO;
import com.example.gerenciadordetarefas.model.Tarefa;
import com.example.gerenciadordetarefas.service.TarefaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefas")
public class TarefaController {

    @Autowired
    private TarefaService tarefaService;

    @PostMapping
    public ResponseEntity<Tarefa> criarTarefa(@RequestBody TarefaDTO tarefaDTO) {
        Tarefa novaTarefa = tarefaService.criarTarefa(tarefaDTO);
        return ResponseEntity.ok(novaTarefa);
    }

    @GetMapping
    public ResponseEntity<List<Tarefa>> listarTarefas() {
        List<Tarefa> tarefas = tarefaService.listarTarefas();
        return ResponseEntity.ok(tarefas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarefaDTO> buscarTarefaPorId(@PathVariable Long id) {
        TarefaDTO tarefaDTO = tarefaService.buscarTarefaPorId(id);
        if (tarefaDTO != null) {
            return ResponseEntity.ok(tarefaDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> editarTarefa(@PathVariable Long id, @RequestBody TarefaDTO tarefaDTO) {
        Tarefa tarefaAtualizada = tarefaService.editarTarefa(id, tarefaDTO);
        return ResponseEntity.ok(tarefaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirTarefa(@PathVariable Long id) {
        tarefaService.excluirTarefa(id);
        return ResponseEntity.noContent().build();
    }
}