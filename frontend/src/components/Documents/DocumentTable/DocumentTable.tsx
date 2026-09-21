import React from 'react';
import type { Document } from '../../../types/document_types';
import { DocumentRow } from '../DocumentRow/DocumentRow';
import styles from './DocumentTable.module.css';
import { CalendarRange, Download } from 'lucide-react';

interface DocumentTableProps {
  documents: Document[];
  onSelectDocument: (doc: Document) => void;
  selectedId?: string;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({ documents, onSelectDocument, selectedId }) => {
  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <span>Nome do Documento</span>
        <span> <CalendarRange color='black' className={styles.icon_date} size={20}/> Data</span>
      </div>
      <div className={styles.body}>
        {documents.map((doc) => (
          <DocumentRow 
            key={doc.id} 
            document={doc} 
            isSelected={doc.id === selectedId} 
            onSelect={onSelectDocument} 
          />
        ))}
      </div>
    </div>
  );
};