# Gerenciador de Tarefas - Frontend

Este é o frontend da aplicação Gerenciador de Tarefas, uma To-Do List simples que permite aos usuários se cadastrarem, autenticarem-se e gerenciarem suas tarefas pessoais.

## Tecnologias Utilizadas

- React
- React Hooks
- JavaScript
- CSS

## Estrutura do Projeto

- `public/index.html`: Arquivo HTML principal da aplicação.
- `src/App.js`: Componente principal que gerencia a estrutura e lógica da interface.
- `src/index.js`: Ponto de entrada da aplicação React.
- `src/components/Auth/`: Contém os componentes para autenticação (Login e Registro).
- `src/components/Tarefas/`: Contém os componentes para gerenciamento de tarefas (Formulário e Lista).
- `src/services/`: Contém funções para interagir com a API do backend e gerenciar autenticação.
- `src/utils/`: Contém funções utilitárias, como armazenamento e recuperação do token JWT.

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   cd gerenciador-de-tarefas/frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

## Execução

Para executar a aplicação, utilize o comando:

```
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

## Docker

Para construir e executar a aplicação utilizando Docker, utilize o comando:

```
docker build -t gerenciador-de-tarefas-frontend .
docker run -p 3000:3000 gerenciador-de-tarefas-frontend
```

## Contribuição

Sinta-se à vontade para contribuir com melhorias ou correções. Abra uma issue ou um pull request!

## Licença

Este projeto está licenciado sob a MIT License.