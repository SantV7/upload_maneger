import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import type { Document } from '../../types/document_types';
import { api } from '../../services/API';
import styles from './DocumentDetails.module.css';

export const DocumentDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    if (id) {
      api.getDocumentById(id).then(setDocument).catch(console.error);
    }
  }, [id]);

  if (!document) return <div className={styles.loading}>A carregar...</div>;

  return (
    <div className={styles.page}>
      <h1>{document.title}</h1>
      <p>Detalhes completos do documento selecionado.</p>
    </div>
  );
};