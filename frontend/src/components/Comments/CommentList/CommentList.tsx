import React from 'react';
import styles from './CommentList.module.css';

interface Comment {
  id: string;
  text: string;
  createdAt: string;
}

interface CommentListProps {
  comments: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className={styles.list}>
      {comments.length === 0 ? (
        <p className={styles.empty}>Nenhum comentário ainda.</p>
      ) : (
        comments.map((c) => (
          <div key={c.id} className={styles.commentItem}>
            <p>{c.text}</p>
            <span className={styles.date}>
              {new Date(c.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        ))
      )}
    </div>
  );
};