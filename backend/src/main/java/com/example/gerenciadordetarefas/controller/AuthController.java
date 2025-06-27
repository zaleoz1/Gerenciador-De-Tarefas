package com.example.gerenciadordetarefas.controller;

import com.example.gerenciadordetarefas.dto.LoginRequest;
import com.example.gerenciadordetarefas.dto.RegisterRequest;
import com.example.gerenciadordetarefas.model.Usuario;
import com.example.gerenciadordetarefas.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        Usuario usuario = authService.register(registerRequest);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String token = authService.login(loginRequest);
        return ResponseEntity.ok(token);
    }
}