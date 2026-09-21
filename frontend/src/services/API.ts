import type { Document } from '../types/document_types';

const API_BASE_URL = import.meta.env.APP_APP; 

export const api = { async getDocuments(): Promise<Document[]> {
    const response = await fetch(`${API_BASE_URL}/documents`);
    if (!response.ok) throw new Error('Erro ao buscar documentos');
    return response.json();
  },

  async getDocumentById(id: string): Promise<Document> {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`);
    if (!response.ok) throw new Error('Erro ao buscar detalhes do documento');
    return response.json();
  },

  async uploadDocument(formData: FormData): Promise<Document> {
    const response = await fetch(`${API_BASE_URL}/documents`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Erro ao fazer upload do documento');
    return response.json();
  },

  async addComment(documentId: string, content: string): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/documents/${documentId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) throw new Error('Erro ao adicionar comentário');
    return response.json();
  },

  getFileUrl(filePath: string): string {
    return `${API_BASE_URL}/${filePath}`;
  }
};