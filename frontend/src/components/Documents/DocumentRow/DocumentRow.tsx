import React from 'react';
import type { Document } from '../../../types/document_types';
import styles from './DocumentRow.module.css';
import { SquarePen, Trash } from 'lucide-react';
import { CommentForm } from '../../Comments/CommentForm/CommentForm';

interface DocumentRowProps {
  document: Document;
  isSelected: boolean;
  onSelect: (doc: Document) => void;
  onDelete: (id: string) => void;
  onEdit: (doc: Document) => void;
  onAddComment: (content: string) => void;
}

export const DocumentRow: React.FC<DocumentRowProps> = ({ 
  document, 
  isSelected, 
  onSelect, 
  onDelete, 
  onEdit,
  onAddComment
}) => {
  const comments = document.comments ?? [];
  return (
    <div className={styles.documentItem}>
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
    {isSelected && (
      <section className={styles.commentsSection} aria-label={`Comentários de ${document.title}`}>
        <h3>Comentários</h3>
        {comments.length > 0 ? (
          <div className={styles.commentList}>
            {comments.map((comment) => (
              <article key={comment.id} className={styles.commentItem}>
                <p>{comment.text}</p>
                <time dateTime={comment.createdAt}>
                  {new Date(comment.createdAt).toLocaleString('pt-BR', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                  })}
                </time>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.noComments}>Nenhum comentário para este arquivo.</p>
        )}
        <CommentForm onSubmitComment={onAddComment} />
      </section>
    )}
    </div>
  );
};
