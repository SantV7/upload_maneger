import React from 'react';
import { Button } from '../../UI/Button/Button';
import styles from './DocumentActions.module.css';

interface DocumentActionsProps {
  onDownload: () => void;
  onDelete?: () => void;
}

export const DocumentActions: React.FC<DocumentActionsProps> = ({ onDownload, onDelete }) => {
  return (
    <div className={styles.actions}>
      <Button variant="primary" onClick={onDownload}>Download</Button>
      {onDelete && (
        <Button variant="secondary" onClick={onDelete}>Excluir</Button>
      )}
    </div>
  );
};