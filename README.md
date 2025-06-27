# Gerenciador de Tarefas

Este é um sistema web simples de To-Do List que permite aos usuários se cadastrarem, autenticarem-se e gerenciarem suas tarefas pessoais.

## Tecnologias Utilizadas

- **Backend**: Java, Spring Boot, Spring Security, JWT, MariaDB
- **Frontend**: React
- **Containerização**: Docker

## Funcionalidades

### Cadastro de Usuário
- Registro de novos usuários com nome completo, login único e senha.

### Login / Autenticação
- Autenticação de usuários com login e senha, utilizando Spring Security e JWT.

### Gerenciamento de Tarefas
- CRUD de tarefas:
  - Criar nova tarefa com nome, data/hora de início, data/hora de fim e status.
  - Listar todas as tarefas do usuário autenticado.
  - Editar e excluir tarefas.

## Instruções de Execução

Para executar o projeto, utilize o Docker Compose. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd gerenciador-de-tarefas
   ```

2. Execute o comando a seguir para iniciar todos os serviços:
   ```
   docker-compose up
   ```

3. A aplicação estará disponível em `http://localhost:3000` para o frontend e `http://localhost:8080` para o backend.

## Documentação da API

A documentação da API está disponível através do Swagger. Após iniciar a aplicação, acesse `http://localhost:8080/swagger-ui.html` para visualizar a documentação interativa.

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, crie um fork do repositório, faça suas alterações e envie um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.