import React from 'react';
import styles from './CommentList.module.css';
import { CommentItem } from '../CommenttItem/CommentItem';

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
        comments.map((c) => <CommentItem key={c.id} text={c.text} createdAt={c.createdAt} />)
      )}
    </div>
  );
};