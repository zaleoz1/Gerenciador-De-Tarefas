package com.example.gerenciadordetarefas.dto;

public class UsuarioDTO {
    private String nomeCompleto;
    private String login;
    private String senha;

    // Getters e setters
    public String getNomeCompleto() { return nomeCompleto; }
    public void setNomeCompleto(String nomeCompleto) { this.nomeCompleto = nomeCompleto; }
    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}
