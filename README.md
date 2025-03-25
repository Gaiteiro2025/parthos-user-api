# Parthos User API

Este repositório contém a API de usuário e autenticação do Parthos, responsável pelo gerenciamento de contas, autenticação e autorização dentro do ecossistema Parthos.

## Índice

1. [Instalação](#instalacao)
2. [Configuração do Ambiente](#configuracao-do-ambiente)
3. [Uso](#uso)
4. [Docker](#docker)
5. [Testes](#testes)
6. [Integração Contínua](#integracao-continua)
7. [Releases](#releases)
8. [Contribuição](#contribuicao)
9. [Licença](#licenca)

---

## Instalação

Clone este repositório:

```bash
$ git clone https://github.com/Gaiteiro2025/parthos-user-api.git
$ cd parthos-user-api
```

Instale as dependências:

```bash
$ npm install
```

---

## Configuração do Ambiente

Antes de rodar o projeto, crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias.

Exemplo de `.env`:

```ini
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=nestdb
JWT_SECRET=default_secret
```

## Uso

Para iniciar a aplicação em modo de desenvolvimento:

```bash
$ npm run start:dev
```

A API estará disponível em: [http://localhost:3001](http://localhost:3001)

A documentação Swagger estará em: [http://localhost:3001/api](http://localhost:3001/api)

---

## Docker

O projeto inclui suporte ao Docker para facilitar a execução e os testes.

### Subir o ambiente de desenvolvimento

```bash
$ docker-compose up --build
```

Com o contêiner rodando, aplique as migrations:

```bash
$ docker exec -it parthos-user-api sh -c "npm run typeorm:migrate src/migrations/CreateUserTable"
```

### Rodar os testes em um container

```bash
docker-compose -f docker-compose.test.yml up
```

### Acessar o container para execução manual

```bash
$ docker exec -it parthos-user-api sh
```

Para o ambiente de testes:

```bash
$ docker exec -it parthos-user-test-api sh
```

---

## Testes

### Testes Unitários

```bash
$ npm run test
```

### Testes de Cobertura

```bash
$ npm run test:cov
```

### Testes de End-to-End (E2E)

```bash
$ npm run test:e2e
```

### Testes com Docker Compose

```bash
docker-compose -f docker-compose.test.yml up
```

---

## Integração Contínua

O projeto utiliza GitHub Actions para rodar os testes automaticamente nas PRs para `main`.

Arquivo `.github/workflows/test.yml`:

---

## Releases

Acompanhe as versões e mudanças da API:

- **[Versão 1.0.0](https://github.com/Gaiteiro2025/parthos-user-api/releases/tag/v1.0.0)**

Novas versões serão lançadas conforme melhorias e novas funcionalidades forem implementadas.

---

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua feature: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'Minha nova feature'`.
4. Envie para o repositório remoto: `git push origin minha-feature`.
5. Abra um Pull Request.

---

## Licença

Este projeto está sob a licença [MIT](LICENSE).

