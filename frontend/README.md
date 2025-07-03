# Gerenciador de Tarefas - Frontend

Este é o frontend da aplicação Gerenciador de Tarefas, uma To-Do List simples que permite aos usuários se cadastrarem, autenticarem-se e gerenciarem suas tarefas pessoais.

## Tecnologias Utilizadas

- React
- React Hooks
- React Router DOM
- JavaScript
- Axios
- TailwindCSS
- PostCSS
- Autoprefixer
- Docker

## Estrutura do Projeto

- `public/index.html`: HTML principal da aplicação.
- `public/Styles/Styles.css`: Arquivo de estilos base do TailwindCSS.
- `public/Styles/output.css`: CSS gerado pelo Tailwind.
- `img/`: Imagens utilizadas na interface.
- `src/App.js`: Componente principal React.
- `src/index.js`: Ponto de entrada da aplicação React.
- `src/components/Auth/LoginForm.js`: Formulário de login.
- `src/components/Auth/RegisterForm.js`: Formulário de registro.
- `src/components/Tarefas/TarefaForm.js`: Formulário para criar/editar tarefas.
- `src/components/Tarefas/TarefaList.js`: Lista de tarefas do usuário.
- `src/services/api.js`: Configuração do Axios para requisições à API.
- `src/services/auth.js`: Funções de autenticação (login, registro, etc).
- `src/utils/jwt.js`: Utilitário para manipulação de tokens JWT.

## Scripts Disponíveis

- `npm start`: Inicia a aplicação em modo desenvolvimento.
- `npm run build`: Gera o build de produção.
- `npm run dev`: Gera o CSS do Tailwind em modo watch (útil para desenvolvimento de estilos).
- `npm test`: Executa os testes (caso existam).

## Instalação

1. Clone o repositório:
   ```
   git clone <https://github.com/zaleoz1/Gerenciador-De-Tarefas>
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

Para compilar o CSS do Tailwind em tempo real durante o desenvolvimento de estilos, utilize:

```
npm run dev
```

## Docker

Para construir e executar a aplicação utilizando Docker:

```
docker build -t gerenciador-de-tarefas-frontend .
docker run -p 3000:3000 gerenciador-de-tarefas-frontend
```