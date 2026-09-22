import React from 'react';
import type { Document } from '../../../types/document_types';
import styles from './DocumentRow.module.css';
import { SquarePen, Trash } from 'lucide-react';

interface DocumentRowProps {
  document: Document;
  isSelected: boolean;
  onSelect: (doc: Document) => void;
  onDelete: (id: string) => void;
  onEdit: (doc: Document) => void;
}

export const DocumentRow: React.FC<DocumentRowProps> = ({ 
  document, 
  isSelected, 
  onSelect, 
  onDelete, 
  onEdit 
}) => {
  return (
    <div 
      className={`${styles.row} ${isSelected ? styles.selected : ''}`} 
      onClick={() => onSelect(document)}
    >
      <span className={styles.title}>{document.title}</span>
      
      <div className={styles.rightSection}>
        <span className={styles.date}>
          {new Date(document.createdAt).toLocaleDateString()}
        </span>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(document);
            }}
            title="Editar Título"
          >
            <SquarePen size={16} />
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(document.id);
            }}
            title="Excluir Documento"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};