# Desafio Backend

Este projeto é uma aplicação Node.js com TypeScript para listar municípios de uma UF usando diferentes APIs.

## Estrutura do Projeto

- `src/`: O código fonte da aplicação.
  - `controllers/`: Controladores para lidar com as rotas.
  - `routes/`: Definições das rotas da API.
  - `services/`: Lógica de negócios e serviços.
  - `app.ts`: Configuração principal da aplicação.
  - `index.ts`: Ponto de entrada do aplicativo.
- `tests/`: Testes unitários e de integração.
- `.github/workflows/ci.yml`: Configuração do GitHub Actions para CI/CD.
- `tsconfig.json`: Configuração do TypeScript.
- `package.json`: Dependências e scripts do projeto.
- `.gitignore`: Arquivos e pastas a serem ignorados pelo Git.

## Pré-requisitos

Para executar este projeto, você precisa ter o Node.js versão 18 instalado. Você pode verificar sua versão do Node.js com:

```bash
node -v
