# Gerenciador de Tarefas

Este é um sistema web completo de To-Do List, onde usuários podem se cadastrar, autenticar e gerenciar suas tarefas pessoais. O projeto é dividido em backend (Java + Spring Boot) e frontend (React), ambos containerizados com Docker.

## Tecnologias Utilizadas

- **Backend:** Java 11, Spring Boot, Spring Security, JWT, MariaDB/MySQL, Maven, Swagger
- **Frontend:** React, React Router DOM, Axios, TailwindCSS, PostCSS, Autoprefixer
- **Containerização:** Docker, Docker Compose

## Estrutura do Projeto

```
gerenciador-de-tarefas/
├── backend/   # API REST em Java Spring Boot
│   ├── src/main/java/com/example/gerenciadordetarefas/
│   │   ├── config/         # Configurações de segurança e web
│   │   ├── controller/     # Controllers REST (auth, tarefas)
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── model/          # Entidades JPA (Tarefa, Usuário)
│   │   ├── repository/     # Interfaces de acesso a dados
│   │   ├── security/       # JWT, UserDetailsService
│   │   └── service/        # Lógica de negócio
│   ├── src/main/resources/
│   │   ├── application.properties  # Configurações do Spring
│   │   └── static/         # Arquivos estáticos
│   ├── Dockerfile
│   ├── build-backend.bat
│   ├── mvnw
│   └── pom.xml
├── frontend/  # Aplicação React
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/       # Login e Registro
│   │   │   └── Tarefas/    # Formulário e Lista de Tarefas
│   │   ├── services/       # api.js, auth.js
│   │   └── utils/          # jwt.js
│   ├── public/
│   │   └── Styles/         # CSS do Tailwind
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Funcionalidades

- **Cadastro de Usuário:** Registro com nome, login único e senha.
- **Login/Autenticação:** Autenticação via JWT.
- **Gerenciamento de Tarefas:**
  - Criar, listar, editar e excluir tarefas (nome, data/hora início/fim, status).
  - Cada usuário só acessa suas próprias tarefas.
- **Documentação da API:** Swagger disponível em `/swagger-ui.html`.

## Instruções de Execução (Docker Compose)

1. Clone o repositório:
   ```sh
   git clone https://github.com/zaleoz1/Gerenciador-De-Tarefas
   cd gerenciador-de-tarefas
   ```
2. Inicie todos os serviços:
   ```sh
   docker-compose up
   ```
3. Acesse:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:8080](http://localhost:8080)
   - Swagger: [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

## Execução Manual (sem Docker)

### Backend
1. Configure o banco de dados MySQL e ajuste `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/Gerenciador_de_tarefas
   spring.datasource.username=SEU_USUARIO
   spring.datasource.password=SUA_SENHA
   jwt.secret=seu_segredo_jwt
   jwt.expiration=3600000
   ```
2. Compile e execute:
   ```sh
   cd backend
   ./mvnw clean package
   java -jar target/gerenciador-de-tarefas-0.0.1-SNAPSHOT.jar
   ```

### Frontend
1. Instale as dependências:
   ```sh
   cd frontend
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```sh
   npm start
   ```

## Endpoints Principais da API

- `POST /api/auth/register` — Cadastro de usuário
- `POST /api/auth/login` — Login (retorna JWT)
- `GET /api/tarefas` — Lista tarefas do usuário autenticado
- `POST /api/tarefas` — Cria nova tarefa
- `PUT /api/tarefas/{id}` — Edita tarefa
- `DELETE /api/tarefas/{id}` — Exclui tarefa

> Todos os endpoints de tarefas exigem autenticação via Bearer Token (JWT).

## Variáveis de Ambiente Importantes

- `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password` (backend)
- `jwt.secret`, `jwt.expiration` (backend)

## Scripts Úteis

### Backend
- `build-backend.bat` — Build rápido no Windows
- `./mvnw clean package` — Build multiplataforma
- `docker build -t gerenciador-de-tarefas-backend .` — Build Docker

### Frontend
- `npm start` — Dev server
- `npm run build` — Build produção
- `npm run dev` — Watch CSS Tailwind
- `docker build -t gerenciador-de-tarefas-frontend .` — Build Docker

## Testes

- **Backend:** Testes automatizados em `backend/src/test/java/...`
- **Frontend:** Suporte a testes com `npm test`

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, crie um fork do repositório, faça suas alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.
