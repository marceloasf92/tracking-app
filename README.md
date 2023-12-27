# Projeto Tracking App

## Sobre o Projeto

O Tracking App é uma aplicação de rastreamento de entregas desenvolvida como parte do desafio Delliv Fullstack Pleno Coding Challenge. O objetivo é criar um aplicativo que permita aos usuários autenticados visualizar e gerenciar pedidos, além de fornecer autenticação e segurança robustas.

## Tecnologias Utilizadas

- **Frontend**: React com Redux e TypeScript
- **Backend**: NestJS com Prisma
- **Banco de Dados**: PostgreSQL
- **Contêinerização**: Docker
- **Autenticação e Segurança**: JWT (JSON Web Tokens)
- **Testes**: Jest (para testes unitários tanto no frontend quanto no backend)

## Pré-requisitos

- Docker e Docker Compose
- Node.js (para execução local sem Docker)
- Gerenciador de pacotes (Yarn ou npm)

## Configuração e Execução

### Subindo a Aplicação com Docker

1. **Construir e Executar os Contêineres**:
```shell
docker-compose up --build
```

2. **Executar as Migrações do Backend:**:

Primeiro, identifique o container do backend usando:
```shell
docker ps
```

Em seguida, execute as migrações:
```shell
docker exec -it <nome_do_container_backend> yarn prisma migrate dev --name init
```

Exemplo:
```shell
docker exec -it backend-app-1 yarn prisma migrate dev --name init
```

2. **Acessar a Aplicação:**:

- **Frontend**: [http://localhost:3000/](http://localhost:3000/)
- **Backend**: [http://localhost:3001/](http://localhost:3001/)

## Funcionalidades da API

### Autenticação (Login)

- **POST /login**: Autentica um usuário e retorna um token JWT.

### Usuários (Users)

- **GET /users**: Lista todos os usuários.
- **GET /users/**:id: Busca um usuário pelo ID.
- **POST /users**: Cria um novo usuário.
- **PUT /users/:id**: Atualiza um usuário existente.
- **DELETE /users/:id**: Remove um usuário.

### Pedidos (Orders)

- **POST /orders**: Cria um novo pedido.
- **GET /orders**: Lista todos os pedidos.
- **GET /orders/order/:id**: Busca um pedido pelo ID.
- **GET /orders/user/:id**: Lista pedidos de um usuário específico.
- **PUT /orders/:id**: Atualiza o status de um pedido.
- **DELETE /orders/:id**: Remove um pedido.

## Tarefas do Desafio

- **Configuração do Ambiente**: Setup do projeto com React, Redux, TypeScript, NestJS, Prisma e Docker.
- **Modelagem de Dados**: Criação dos modelos de pedidos e usuários no PostgreSQL usando Prisma.
- **Implementação do Backend**: Desenvolvimento dos controladores e endpoints em NestJS.
- **Implementação do Frontend**: Desenvolvimento da interface do usuário seguindo o conceito de Atomic Design.
- **Testes Unitários**: Criação de testes para as principais funcionalidades usando Jest.
- **Contêinerização com Docker**: Configuração do Dockerfile e docker-compose.yml.

## Recomendações

Siga as instruções de configuração para inicializar corretamente a aplicação. Consulte a documentação das tecnologias utilizadas para melhor entendimento e personalização.