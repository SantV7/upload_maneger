# DocumentFlow

Aplicação Full Stack para upload local de documentos e gestão de comentários por documento. Desenvolvida para a prova técnica de Estágio Desenvolvedor Full Stack.

Link: https://upload-maneger.vercel.app/

## Funcionalidades

- Upload de documentos PDF, JPG e PNG (limite de 10 MB).
- Título obrigatório e descrição opcional.
- Armazenamento local em `backend/uploads` e persistência dos metadados no PostgreSQL.
- Listagem de documentos com título e data de envio.
- Download do arquivo selecionado.
- Inclusão e histórico de comentários associados ao documento correto, com data e hora de registro.
- Exclusão de documento e comentários relacionados em cascata.
- Interface responsiva para desktop, tablet e celular.

## Tecnologias

- Frontend: React, TypeScript e Vite.
- Backend: Node.js, Express e TypeScript.
- Banco de dados: PostgreSQL com Prisma ORM.
- Upload: Multer.

## Estrutura de dados

`Document` possui título, descrição opcional, caminho do arquivo, tipo MIME e data de criação. `Comment` possui texto, data de criação e `documentId`, uma chave estrangeira para `Document`. Ao excluir um documento, seus comentários são excluídos em cascata.

## Execução local

### Pré-requisitos

- Node.js 20 ou superior.
- PostgreSQL em execução.

### Backend

```bash
cd backend
npm install
```

Crie `backend/.env`:

```env
PORT=3000
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
```

Execute as migrations e inicie a API:

```bash
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Crie `frontend/.env`:

```env
APP_API_ROUTE=http://localhost:3000
```

Inicie a interface:

```bash
npm run dev
```

## Rotas da API

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/documents` | Envia um PDF, JPG ou PNG. Campos: `title`, `description` opcional e `file`. |
| `GET` | `/documents` | Lista documentos com seus comentários. |
| `GET` | `/documents/:id` | Retorna um documento e seu histórico de comentários. |
| `GET` | `/documents/:id/download` | Faz o download do arquivo do documento. |
| `PUT` | `/documents/:id` | Atualiza título e/ou descrição. |
| `DELETE` | `/documents/:id` | Exclui o documento e seus comentários. |
| `POST` | `/documents/:documentId/comments` | Cria um comentário vinculado ao documento. |
| `GET` | `/documents/:documentId/comments` | Lista comentários de um documento. |

## Verificação

```bash
cd backend && npx tsc --noEmit
cd frontend && npm run lint && npm run build
```

## Deploy

O deploy público ainda deve ser configurado. Antes de publicar, defina `DATABASE_URL` e `PORT` no ambiente do backend e `APP_API_ROUTE` com a URL pública da API no ambiente do frontend. Após a publicação, inclua aqui a URL pública da aplicação.

## Observações

- Não há autenticação, conforme o escopo da prova.
- O armazenamento é local. Em plataformas com sistema de arquivos efêmero, use armazenamento persistente ou um serviço de arquivos para preservar uploads após reinicializações.
