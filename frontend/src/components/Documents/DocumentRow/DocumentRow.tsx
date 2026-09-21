import React from 'react';
import type { Document } from '../../../types/document_types';
import styles from './DocumentRow.module.css';

interface DocumentRowProps {
  document: Document;
  isSelected: boolean;
  onSelect: (doc: Document) => void;
}

export const DocumentRow: React.FC<DocumentRowProps> = ({ document, isSelected, onSelect }) => {
  return (
    <div 
      className={`${styles.row} ${isSelected ? styles.selected : ''}`} 
      onClick={() => onSelect(document)}
    >
      <span className={styles.title}>{document.title}</span>
      <span className={styles.date}>{new Date(document.createdAt).toLocaleDateString()}</span>
    </div>
  );
};