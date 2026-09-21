import React from 'react';
import type { Document } from '../../../types/document_types';
import { DocumentActions } from '../DocumentActions/DocumentActions';
import { FiFileText, FiImage } from 'react-icons/fi';

interface DocumentRowProps {
  document: Document;
  onSelect: (doc: Document) => void;
}

export const DocumentRow: React.FC<DocumentRowProps> = ({ document, onSelect }) => {
  const isImage = document.mimeType.includes('image');

  return (
    <tr onClick={() => onSelect(document)} style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer' }}>
      <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {isImage ? <FiImage color="#2563eb" size={20} /> : <FiFileText color="#ef4444" size={20} />}
        <div>
          <p style={{ fontWeight: 500, color: '#111827', margin: 0 }}>{document.title}</p>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>{document.mimeType}</span>
        </div>
      </td>
      <td style={{ padding: '12px 16px', color: '#4b5563', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {document.description || '-'}
      </td>
      <td style={{ padding: '12px 16px', color: '#6b7280', fontSize: '13px' }}>{document.createdAt}</td>
      <td style={{ padding: '12px 16px' }} onClick={(e) => e.stopPropagation()}>
        <DocumentActions />
      </td>
    </tr>
  );
};