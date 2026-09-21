# Task List & Roadmap

## Funcionalidades da API (Backend)

- [x] POST /documents: Faz o upload do arquivo (PDF, JPG ou PNG), guarda localmente e salva os metadados no banco.
- [x] GET /documents: Lista todos os documentos cadastrados (com título, data de upload e link para download).
- [x] GET /documents/:id: Mostra os detalhes de um documento específico junto com o seu histórico de comentários.
- [x] POST /documents/:id/comments: Adiciona um novo comentário vinculado a um documento específico.
- [x] GET /uploads/... (ou rota estática): Serve os arquivos salvos localmente para que possam ser visualizados ou baixados.