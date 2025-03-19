# Nest Template API

Este projeto é um template para criar APIs utilizando o framework [NestJS](https://nestjs.com/). Ele vem configurado com boas práticas, suporte a TypeORM, Swagger para documentação e um pipeline de testes.

## Índice

1. [Personalização do Template](#personalizacao-do-template)
2. [Instalação](#instalacao)
3. [Uso](#uso)
4. [Docker](#docker)
5. [Testes](#testes)
6. [Contribuição](#contribuicao)

---

## Personalização do Template

Para personalizar este template, siga os passos abaixo:

### Alterar o nome do projeto

1. Substitua todas as ocorrências de `nest-template` pelo nome desejado para o projeto (por exemplo, `nome-do-projeto`).
2. Substitua todas as ocorrências de `NestTemplateApi` pelo formato PascalCase do novo nome (por exemplo, `NomeDoProjeto`).

#### No projeto

- **`package.json`**: Atualize os campos `name` e `description`:

```json
{
  "name": "nome-do-projeto",
  "description": "Descrição do projeto"
}
```

- **Nomes dos arquivos principais**:
  - Renomeie arquivos, se necessário, para refletir o novo nome do projeto.

- **Módulos e Classes**:
  - Substitua `NestTemplateApi` por `NomeDoProjeto` em todos os arquivos TypeScript.

```typescript
@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class NomeDoProjetoModule {}
```

#### No Docker

- Atualize o nome da imagem no `Dockerfile` e no `docker-compose.yml`.

```dockerfile
# Dockerfile
LABEL name="nome-do-projeto"
```

```yaml
# docker-compose.yml
services:
  app:
    image: nome-do-projeto
```

#### Em toda a base de código

Use um comando de busca e substituição para alterar o nome globalmente:

```bash
grep -rl 'nest-template-api' ./ | xargs sed -i 's/nest-template-api/nome-do-projeto/g'
grep -rl 'NestTemplateApi' ./ | xargs sed -i 's/NestTemplateApi/NomeDoProjeto/g'
```

---

## Instalação

Clone este repositório e instale as dependências:

```bash
$ git clone https://github.com/seu-usuario/nest-template-api.git
$ cd nest-template-api
$ docker compose up --build
```

## Uso

Este projeto inclui suporte ao Docker para facilitar a execução e o teste em ambientes isolados.

#### Subir o ambiente de desenvolvimento

```bash
docker compose up
```

#### Rodar os testes em um container

```bash
docker compose -f docker-compose.test.yml up
```

#### Execute a aplicação em modo de DESENVOLVIMENTO:

```bash
$ docker exec -it nest-template-api sh
```

#### Execute a aplicação em modo de TESTES:

```bash
$ docker exec -it nest-template-test-api s
```

Acesse a API no navegador em: [http://localhost:3000](http://localhost:3000)

A documentação Swagger estará disponível em: [http://localhost:3000/api](http://localhost:3000/api)

---
## Testes

### Testes Unitários

Rode os testes unitários com o seguinte comando:

```bash
$ npm run test
```

### Testes de Cobertura

Gere o relatório de cobertura:

```bash
$ npm run test:cov
```

### Testes End-to-End (E2E)

Execute os testes E2E:

```bash
$ npm run test:e2e
```

### Testes com Docker Compose

Para rodar os testes em um ambiente isolado usando Docker Compose, utilize o arquivo `docker-compose.test.yml`:

```bash
docker-compose -f docker-compose.test.yml up
```

---

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature: `git checkout -b minha-feature`.
3. Commit suas mudanças: `git commit -m 'Minha nova feature'`.
4. Envie para o repositório remoto: `git push origin minha-feature`.
5. Abra um Pull Request.

---

## Licença

Este projeto está sob a licença [MIT](LICENSE).

