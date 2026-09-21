import React from 'react';
import styles from './CommentItem.module.css';

interface CommentItemProps {
  text: string;
  createdAt: string;
}

export const CommentItem: React.FC<CommentItemProps> = ({ text, createdAt }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.avatar}>U</div>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.author}>Utilizador</span>
          <span className={styles.date}>{new Date(createdAt).toLocaleString()}</span>
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};