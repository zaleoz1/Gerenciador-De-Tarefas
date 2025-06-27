# Gerenciador de Tarefas - Backend

Este é o backend do projeto Gerenciador de Tarefas, uma aplicação web simples de To-Do List que permite aos usuários se cadastrarem, autenticarem-se e gerenciarem suas tarefas pessoais.

## Tecnologias Utilizadas

- Java
- Spring Boot
- Spring Security
- JWT (JSON Web Tokens)
- MariaDB
- Swagger (OpenAPI) para documentação da API

## Estrutura do Projeto

```
backend
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com
│   │   │       └── example
│   │   │           └── gerenciadordetarefas
│   │   │               ├── GerenciadorDeTarefasApplication.java
│   │   │               ├── config
│   │   │               │   └── SecurityConfig.java
│   │   │               ├── controller
│   │   │               │   ├── AuthController.java
│   │   │               │   └── TarefaController.java
│   │   │               ├── dto
│   │   │               │   ├── LoginRequest.java
│   │   │               │   ├── RegisterRequest.java
│   │   │               │   └── TarefaDTO.java
│   │   │               ├── model
│   │   │               │   ├── Tarefa.java
│   │   │               │   └── Usuario.java
│   │   │               ├── repository
│   │   │               │   ├── TarefaRepository.java
│   │   │               │   └── UsuarioRepository.java
│   │   │               ├── security
│   │   │               │   ├── JwtTokenProvider.java
│   │   │               │   └── JwtAuthenticationFilter.java
│   │   │               └── service
│   │   │                   ├── AuthService.java
│   │   │                   └── TarefaService.java
│   │   └── resources
│   │       ├── application.properties
│   │       └── static
│   └── test
│       └── java
│           └── com
│               └── example
│                   └── gerenciadordetarefas
│                       └── GerenciadorDeTarefasApplicationTests.java
├── Dockerfile
└── README.md
```

## Instruções de Execução

1. **Clone o repositório:**
   ```
   git clone <URL_DO_REPOSITORIO>
   cd gerenciador-de-tarefas/backend
   ```

2. **Construir a imagem Docker:**
   ```
   docker build -t gerenciador-de-tarefas-backend .
   ```

3. **Executar a aplicação:**
   ```
   docker run -p 8080:8080 gerenciador-de-tarefas-backend
   ```

4. **Acessar a documentação da API:**
   Após a aplicação estar em execução, acesse `http://localhost:8080/swagger-ui.html` para visualizar a documentação da API gerada pelo Swagger.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, crie um fork do repositório, faça suas alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.