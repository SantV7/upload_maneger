# Task List & Roadmap

## Setup Inicial
- [x] Inicialização do repositório Git
- [x] Estruturação das pastas `frontend` e `backend`
- [x] Criação do `.gitignore` na raiz
- [x] Documentação base (`README.md`, `task.md`)

## Backend (Concluído)
- [x] Inicialização do projeto Node.js
- [x] Instalação e configuração do Express com TypeScript
- [x] Configuração do Prisma ORM e PostgreSQL
- [x] Implementação do módulo de documentos (upload local via Multer, metadados e listagem)
- [x] Implementação do módulo de comentários (criação, listagem e relação em cascata)
- [x] `POST /documents`: Upload de arquivos (PDF, JPG ou PNG), armazenamento local e persistência no banco
- [x] `GET /documents`: Listagem de todos os documentos cadastrados
- [x] `GET /documents/:id`: Detalhes de um documento específico e seu histórico de comentários
- [x] `POST /documents/:id/comments`: Inserção de novos comentários vinculados ao documento
- [x] Rota estática para servir os arquivos salvos localmente

## Frontend (Em Andamento)
- [ ] Estrutura base em HTML, CSS e JavaScript puro
- [ ] Implementação do formulário de upload de documentos
- [ ] Listagem dinâmica de documentos com acesso direto aos ficheiros
- [ ] Interface interativa para visualização e inserção de comentários por documento