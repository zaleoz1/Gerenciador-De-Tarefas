package com.example.gerenciadordetarefas.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

public class TarefaDTO {

    @NotBlank
    private String nome;

    @NotNull
    private LocalDateTime dataHoraInicio;

    @NotNull
    private LocalDateTime dataHoraFim;

    @NotBlank
    private String status;

    public TarefaDTO() {
    }

    public TarefaDTO(String nome, LocalDateTime dataHoraInicio, LocalDateTime dataHoraFim, String status) {
        this.nome = nome;
        this.dataHoraInicio = dataHoraInicio;
        this.dataHoraFim = dataHoraFim;
        this.status = status;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDateTime getDataHoraInicio() {
        return dataHoraInicio;
    }

    public void setDataHoraInicio(LocalDateTime dataHoraInicio) {
        this.dataHoraInicio = dataHoraInicio;
    }

    public LocalDateTime getDataHoraFim() {
        return dataHoraFim;
    }

    public void setDataHoraFim(LocalDateTime dataHoraFim) {
        this.dataHoraFim = dataHoraFim;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}