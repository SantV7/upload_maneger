# Document Manager - Prova Técnica Full Stack

Sistema de gestão de documentos e comentários desenvolvido com arquitetura Full-Stack para avaliação técnica, focado em organização, robustez de backend e clareza de implementação.

## Visão Geral do Projeto

O **Document Manager** é uma aplicação projetada para centralizar o upload, armazenamento, consulta de ficheiros e gestão de interações através de comentários estruturados. A arquitetura foi dividida em um microsserviço de API RESTful robusto e uma interface de cliente moderna e reativa.

## Arquitetura e Tecnologias

- **Frontend:** 
  - React (com Vite para otimização de build)
  - TypeScript para tipagem estática e segurança de código
- **Backend:** 
  - Node.js & Express
  - TypeScript
  - Multer (gestão de upload de ficheiros binários)
- **Banco de Dados & ORM:** 
  - PostgreSQL (relacional)
  - Prisma ORM (gestão de migrações e mapeamento de dados)

## Arquitetura do Banco de Dados & Schema

A modelagem de dados relacional é composta por duas entidades principais com uma relação de dependência em cascata (`Cascade Delete`):

1. **Document (`Documento`)**
   - `id`: Identificador único (UUID ou autoincrement)
   - `title`: Título descritivo do documento
   - `filename`: Nome gerado ou original do ficheiro no servidor
   - `path`: Caminho relativo de armazenamento local
   - `createdAt`: Data e hora de registo

2. **Comment (`Comentário`)**
   - `id`: Identificador único
   - `content`: Texto do comentário
   - `documentId`: Chave estrangeira referenciando o documento associado
   - `createdAt`: Data e hora de criação

## Documentação dos Endpoints da API (Backend)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **POST** | `/documents` | Realiza o upload de um ficheiro (PDF, JPG, PNG), armazena-o localmente e persiste os metadados. |
| **GET** | `/documents` | Retorna a listagem completa de todos os documentos registados na base de dados. |
| **GET** | `/documents/:id` | Retorna os detalhes de um documento específico juntamente com o seu histórico completo de comentários. |
| **POST** | `/documents/:id/comments` | Adiciona um novo comentário textual vinculado diretamente ao documento informado pelo ID. |
| **GET** | `/uploads/...` | Rota estática responsável por servir os ficheiros armazenados localmente para visualização ou download. |

## Instruções para Execução Local

### Pré-requisitos
- Node.js instalado na máquina
- Servidor PostgreSQL ativo localmente ou em container

### 1. Configuração do Backend
\`\`\`bash
cd backend
npm install
# Crie um ficheiro .env na pasta backend com a sua DATABASE_URL do PostgreSQL:
# DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
npx prisma migrate dev
npm run dev
\`\`\`

### 2. Configuração do Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

## Decisões de Arquitetura e Observações
- **Ausência de Autenticação:** Conforme os requisitos específicos do escopo da prova técnica, o sistema omite camadas de autenticação ou login de utilizadores para priorizar a agilidade e o foco nas regras de negócio centrais de documentos e comentários.

- **Armazenamento de Ficheiros:** Utiliza o sistema de ficheiros local gerido pelo Multer no backend, garantindo simplicidade e portabilidade para o ambiente de testes.
