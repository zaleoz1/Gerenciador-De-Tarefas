package com.example.gerenciadordetarefas.controller;

import com.example.gerenciadordetarefas.dto.UsuarioDTO;
import com.example.gerenciadordetarefas.model.Usuario;
import com.example.gerenciadordetarefas.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UsuarioDTO usuarioDTO) {
        System.out.println("Recebido registro: " + usuarioDTO.getLogin());

        if (usuarioRepository.findByLogin(usuarioDTO.getLogin()).isPresent()) {
            return ResponseEntity.badRequest().body("Login já existe!");
        }

        Usuario usuario = new Usuario();
        usuario.setNomeCompleto(usuarioDTO.getNomeCompleto());
        usuario.setLogin(usuarioDTO.getLogin());
        usuario.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));

        usuarioRepository.save(usuario);

        return ResponseEntity.ok("Usuário registrado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UsuarioDTO usuarioDTO) {
        System.out.println("Tentando login: " + usuarioDTO.getLogin() + " | senha recebida: " + usuarioDTO.getSenha());
        var usuarioOpt = usuarioRepository.findByLogin(usuarioDTO.getLogin());
        if (usuarioOpt.isEmpty()) {
            System.out.println("Usuário não encontrado: " + usuarioDTO.getLogin());
            return ResponseEntity.status(401).body("Login inválido. Verifique seu usuário e senha.");
        }

        Usuario usuario = usuarioOpt.get();
        System.out.println("Senha do banco (hash): " + usuario.getSenha());
        boolean senhaConfere = passwordEncoder.matches(usuarioDTO.getSenha(), usuario.getSenha());
        System.out.println("Senha confere? " + senhaConfere);

        if (!senhaConfere) {
            return ResponseEntity.status(401).body("Login inválido. Verifique seu usuário e senha.");
        }

        return ResponseEntity.ok("Login realizado com sucesso!");
    }
}