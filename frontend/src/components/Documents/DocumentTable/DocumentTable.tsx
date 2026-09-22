import React from 'react';
import type { Document } from '../../../../types/document_types';
import { DocumentRow } from '../DocumentRow/DocumentRow';
import styles from './DocumentTable.module.css';
import { CalendarRange } from 'lucide-react';

interface DocumentTableProps {
  documents: Document[];
  onSelectDocument: (doc: Document) => void;
  selectedId?: string;
  onDelete: (id: string) => void;
  onEdit: (doc: Document) => void;
}

export const DocumentTable: React.FC<DocumentTableProps> = ({
  documents,
  onSelectDocument,
  selectedId,
  onDelete,
  onEdit
}) => {
  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <span>Nome do Documento</span>
        <span>
          <CalendarRange
            color='black'
            className={styles.icon_date}
            size={20}
          />
          Data
        </span>
      </div>
      <div className={styles.body}>
        {documents.map((doc) => (
          <DocumentRow
            key={doc.id}
            document={doc}
            isSelected={doc.id === selectedId}
            onSelect={onSelectDocument}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};