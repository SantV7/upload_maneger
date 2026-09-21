import React from 'react';
import type { Document } from '../../../types/document_types';
import { DocumentRow } from '../DocumentRow/DocumentRow';

interface DocumentTableProps {
  documents: Document[];
  onSelectDocument: (doc: Document) => void;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onSelectDocument }) => {
  return (
    <div style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e5e7eb', color: '#6b7280', backgroundColor: '#f9fafb' }}>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Documento</th>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Descrição</th>
            <th style={{ padding: '12px 16px', fontWeight: 600 }}>Enviado em</th>
            <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <DocumentRow key={doc.id} document={doc} onSelect={onSelectDocument} />
          ))}
        </tbody>
      </table>
    </div>
  );
};