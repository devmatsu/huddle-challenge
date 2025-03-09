<p align="center"><a href="[https://empathmsp.com/](https://huddle.huddlebrasil.com/)" target="_blank"><img src="./huddle_logo.png" width="400" alt="Huddle Logo"></a></p>

<p align="center">
<a href=""><img src="https://img.shields.io/badge/node.js-339933?style=flat&logo=Node.js&logoColor=white" alt="Node.js"></a>
<a href=""><img src="https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white" alt="Express.js"></a>
<a href=""><img src="https://img.shields.io/badge/Jest-323330?style=flat&logo=Jest&logoColor=white" alt="JEST"></a>
<a href=""><img src="https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite&logoColor=white" alt="SQLite"></a>
<a href=""><img src="https://img.shields.io/badge/version-1.0.0-green" alt="Version"></a>
</p>

# Sobre

Este repositório contém a solução para o teste técnico da Huddle, focado em criar uma API REST usando Node.js com conexão ao banco de dados.

Você pode encontrar o desafio completo [aqui](./CHALLENGE.md).

**Entrega:**

- [API REST conectado ao banco de dados](https://github.com/devmatsu/huddle-challenge/milestone/1?closed=1):
  - [x] Criação da API utilizando Express.js;
  - [x] Clareza e organização do código;
  - [x] Uso adequado de boas práticas (estrutura, modularização, etc.);
  - [x] Qualidade e Implementação da solução;
  - [x] Documentação para rodar o projeto
  - [x] _(Bonus)_ Testes unitários

---

## Instalação

### Pré requisitos

- **Node.js** ([instale aqui](https://nodejs.org))

### Passos para rodar localmente

1. Clone o repositório:

   ```bash
    git clone https://github.com/devmatsu/huddle-challenge
    cd huddle-challenge
   ```

2. Instale as dependências do projeto:

   ```bash
    npm install
   ```

3. Configure o banco de dados SQLite:

   ```bash
    npm run db:setup
   ```

4. Rode o projeto em modo desenvolvimento:
   ```bash
    npm run dev
   ```

Se tudo estiver correto, você verá:

```bash
 [nodemon] starting `ts-node src/index.ts`
 Server running on port: 3000
 Database connected successfully!
```

## API - Endpoints & Uso

### 1. Status da API

Endpoint: GET `/api/status`  
Verifica se a API está online.
Request:

```
  curl -X GET http://localhost:3000/api/status
```

Response:

```bash
  {
    "message": "API is running!"
  }
```

### 2. Criar uma Tarefa

Endpoint: POST `/api/tasks`  
Cria uma nova tarefa.
Request:

```
  curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Nova Tarefa", "description": "Primeira Tarefa"}'
```

Response:

```bash
  {
    "id": 1,
    "title": "Nova Tarefa",
    "description": "Primeira Tarefa",
    "completed": false,
    "createdAt": "2025-03-09T12:00:00.000Z"
  }
```

### 3. Listar Tarefas

Endpoint: GET `/api/tasks`  
Lista todas as tarefas cadastradas.

Request:

```
  curl -X GET http://localhost:3000/api/tasks
```

Response:

```bash
  [
    {
      "id": 1,
      "title": "Nova Tarefa",
      "description": "Primeira Tarefa",
      "completed": false
    }
  ]
```

### 4. Atualizar uma Tarefa

Endpoint: PUT `/api/tasks/:id`  
Atualiza os detalhes de uma tarefa existente.

Request:

```
  curl -X PUT http://localhost:3000/api/tasks/1 \
    -H "Content-Type: application/json" \
    -d '{"title": "Tarefa Atualizada", "completed": true}'
```

Response:

```bash
  {
    "id": 1,
    "title": "Tarefa Atualizada",
    "completed": true
  }
```

### 5. Deletar uma Tarefa

Endpoint: DELETE `/api/tasks/:id`  
Exclui uma tarefa do banco de dados.

Request:

```
  curl -X DELETE http://localhost:3000/api/tasks/1
```

Response:

```bash
  {
    "message": "Task 1 deleted successfully."
  }
```

## Testes

Para rodar os testes unitários:

```bash
npm test
```

Se todos os testes passarem, você verá algo assim:

```
PASS tests/TaskController.test.ts
✓ should create a task (50ms)
✓ should return API status (30ms)
✓ should delete a task (40ms)
```
