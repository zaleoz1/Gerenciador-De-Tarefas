# Gerenciador de Tarefas - Backend

Este é o backend do projeto Gerenciador de Tarefas, uma aplicação web simples de To-Do List que permite aos usuários se cadastrarem, autenticarem-se e gerenciarem suas tarefas pessoais.

## Tecnologias Utilizadas

- Java 11
- Spring Boot
- Spring Security
- JWT (JSON Web Tokens)
- MariaDB / MySQL
- Swagger (OpenAPI) para documentação da API
- Maven
- Docker

## Estrutura Completa da Pasta Backend

```
backend/
├── .mvn/
│   └── wrapper/
│       ├── maven-wrapper.jar
│       ├── maven-wrapper.properties
│       └── MavenWrapperDownloader.java
├── build-backend.bat         # Script para build no Windows
├── Dockerfile                # Dockerização do backend
├── mvnw                      # Wrapper do Maven (Linux/Mac)
├── pom.xml                   # Gerenciador de dependências Maven
├── README.md                 # Este arquivo
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/gerenciadordetarefas/
│   │   │       ├── GerenciadorDeTarefasApplication.java
│   │   │       ├── config/
│   │   │       │   ├── SecurityConfig.java
│   │   │       │   └── WebConfig.java
│   │   │       ├── controller/
│   │   │       │   ├── AuthController.java
│   │   │       │   └── TarefaController.java
│   │   │       ├── dto/
│   │   │       │   ├── LoginRequest.java
│   │   │       │   ├── RegisterRequest.java
│   │   │       │   ├── TarefaDTO.java
│   │   │       │   └── UsuarioDTO.java
│   │   │       ├── model/
│   │   │       │   ├── Tarefa.java
│   │   │       │   └── Usuario.java
│   │   │       ├── repository/
│   │   │       │   ├── TarefaRepository.java
│   │   │       │   └── UsuarioRepository.java
│   │   │       ├── security/
│   │   │       │   ├── CustomUserDetailsService.java
│   │   │       │   ├── JwtAuthenticationFilter.java
│   │   │       │   └── JwtTokenProvider.java
│   │   │       └── service/
│   │   │           ├── AuthService.java
│   │   │           └── TarefaService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   └── test/
│       └── java/com/example/gerenciadordetarefas/
│           └── GerenciadorDeTarefasApplicationTests.java
├── target/                   # Arquivos gerados pelo build
│   ├── classes/
│   ├── generated-sources/
│   ├── generated-test-sources/
│   ├── gerenciador-de-tarefas-0.0.1-SNAPSHOT.jar
│   ├── gerenciador-de-tarefas-0.0.1-SNAPSHOT.jar.original
│   ├── maven-archiver/
│   ├── maven-status/
│   ├── surefire-reports/
│   └── test-classes/
```

### Descrição dos Principais Arquivos e Pastas

- **.mvn/wrapper/**: Scripts e arquivos do Maven Wrapper para garantir builds reprodutíveis.
- **build-backend.bat**: Script para compilar o projeto no Windows, configurando JAVA_HOME e MAVEN_HOME.
- **Dockerfile**: Permite criar uma imagem Docker do backend.
- **mvnw**: Script do Maven Wrapper para Linux/Mac.
- **pom.xml**: Arquivo de configuração do Maven, com todas as dependências do projeto (Spring Boot, JPA, Security, JWT, MariaDB/MySQL, etc).
- **src/main/java/com/example/gerenciadordetarefas/**: Código-fonte principal da aplicação.
  - **config/**: Configurações de segurança e web.
  - **controller/**: Controllers REST para autenticação e tarefas.
  - **dto/**: Objetos de transferência de dados (Login, Registro, Tarefa, Usuário).
  - **model/**: Entidades JPA (Tarefa, Usuário).
  - **repository/**: Interfaces de acesso a dados (Spring Data JPA).
  - **security/**: Implementação de autenticação JWT e UserDetailsService.
  - **service/**: Lógica de negócio para autenticação e tarefas.
- **src/main/resources/**: Recursos da aplicação (application.properties, arquivos estáticos).
- **src/test/**: Testes automatizados.
- **target/**: Diretório gerado pelo Maven com os artefatos do build.

### Exemplo de application.properties

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/Gerenciador_de_tarefas
spring.datasource.username=root
spring.datasource.password=12435687
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.security.user.name=admin
spring.security.user.password=admin
jwt.secret=seu_segredo_jwt
jwt.expiration=3600000
```

## Instruções de Execução

1. **Clone o repositório:**
   ```
   git clone <https://github.com/zaleoz1/Gerenciador-De-Tarefas>
   cd gerenciador-de-tarefas/backend
   ```
2. **Build do projeto:**
   - No Windows: execute `build-backend.bat`
   - Ou use o Maven diretamente:
     ```
     ./mvnw clean package
     ```
3. **Construir a imagem Docker:**
   ```
   docker build -t gerenciador-de-tarefas-backend .
   ```
4. **Executar a aplicação:**
   ```
   docker run -p 8080:8080 gerenciador-de-tarefas-backend
   ```
5. **Acessar a documentação da API:**
   Após a aplicação estar em execução, acesse `http://localhost:8080/swagger-ui.html` para visualizar a documentação da API gerada pelo Swagger.
