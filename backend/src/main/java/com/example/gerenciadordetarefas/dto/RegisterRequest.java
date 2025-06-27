package com.example.gerenciadordetarefas.dto;

import javax.validation.constraints.NotBlank;

public class RegisterRequest {
    
    @NotBlank
    private String nomeCompleto;

    @NotBlank
    private String login;

    @NotBlank
    private String senha;

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}