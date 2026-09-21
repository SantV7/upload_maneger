import React from 'react';
import type { Document } from '../../../types/document_types';
import { Button } from '../../UI/Button/Button';
import { api } from '../../../services/API';
import styles from './Document.module.css';

interface DocumentDetailsProps {
  document: Document;
}

export const DocumentDetailsComponent: React.FC<DocumentDetailsProps> = ({ document }) => {
  return (
    <div className={styles.card}>
      <h2>{document.title}</h2>
      <p className={styles.meta}>Enviado em: {new Date(document.createdAt).toLocaleString()}</p>
      <a href={api.getFileUrl(document.filePath)} target="_blank" rel="noreferrer">
        <Button variant="primary">Descarregar Ficheiro</Button>
      </a>
    </div>
  );
};