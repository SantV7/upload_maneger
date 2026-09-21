import React from 'react';
import type { Document } from '../../../types/document_types';
import { CommentList } from '../../Comments/CommentList/CommentList';
import { CommentForm } from '../../Comments/CommentForm/CommentForm';
import { Button } from '../../UI/Button/Button';
import { FiFileText, FiImage, FiEye, FiDownload } from 'react-icons/fi';

interface DocumentDetailsProps {
  document: Document | null;
  onAddComment: (docId: string, text: string) => void;
}

export const DocumentDetails: React.FC<DocumentDetailsProps> = ({ document, onAddComment }) => {
  if (!document) {
    return (
      <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center', color: '#6b7280' }}>
        Selecione um documento para ver os detalhes.
      </div>
    );
  }

  const isImage = document.mimeType.includes('image');

  return (
    <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px' }}>
      <div style={{ textAlign: 'center', paddingBottom: '16px', borderBottom: '1px solid #f3f4f6' }}>
        {isImage ? <FiImage size={40} color="#2563eb" style={{ marginBottom: '8px' }} /> : <FiFileText size={40} color="#ef4444" style={{ marginBottom: '8px' }} />}
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', margin: '4px 0' }}>{document.title}</h3>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>Enviado em {document.createdAt}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" style={{ flex: 1 }}><FiEye size={14} /> Visualizar</Button>
          <Button variant="primary" style={{ flex: 1 }}><FiDownload size={14} /> Download</Button>
        </div>
      </div>

      <div style={{ padding: '16px 0', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
        <h4 style={{ fontWeight: 600, color: '#374151', margin: '0 0 8px 0' }}>Informações</h4>
        <p style={{ margin: '4px 0', color: '#6b7280' }}><strong style={{ color: '#111827' }}>Nome:</strong> {document.title}</p>
        <p style={{ margin: '4px 0', color: '#6b7280' }}><strong style={{ color: '#111827' }}>Tipo:</strong> {document.mimeType}</p>
        <p style={{ margin: '4px 0', color: '#6b7280' }}><strong style={{ color: '#111827' }}>Descrição:</strong> {document.description || 'Sem descrição'}</p>
      </div>

      <div style={{ paddingTop: '16px' }}>
        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#374151', margin: '0 0 12px 0' }}>Comentários</h4>
        <CommentList comments={document.comments} />
        <CommentForm documentId={document.id} onAddComment={(text) => onAddComment(document.id, text)} />
      </div>
    </div>
  );
};