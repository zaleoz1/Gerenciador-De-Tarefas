package com.example.gerenciadordetarefas.service;

import com.example.gerenciadordetarefas.dto.LoginRequest;
import com.example.gerenciadordetarefas.dto.RegisterRequest;
import com.example.gerenciadordetarefas.model.Usuario;
import com.example.gerenciadordetarefas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Usuario register(RegisterRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNomeCompleto(request.getNomeCompleto());
        usuario.setLogin(request.getLogin());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        return usuarioRepository.save(usuario);
    }

    public String login(LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByLogin(request.getLogin());
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (passwordEncoder.matches(request.getSenha(), usuario.getSenha())) {
                // Aqui você deveria gerar e retornar o token JWT
                return "fake-jwt-token";
            }
        }
        throw new RuntimeException("Login ou senha inválidos");
    }
}
