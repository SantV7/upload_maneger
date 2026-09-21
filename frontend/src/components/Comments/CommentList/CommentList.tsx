import React from 'react';
import type { Comment } from '../../../types/document_types';
import { CommentItem } from '../CommenttItem/CommentItem';

interface CommentListProps {
  comments?: Comment[];
}

export const CommentList: React.FC<CommentListProps> = ({ comments = [] }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {comments.length === 0 ? (
        <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>Nenhum comentário ainda.</p>
      ) : (
        comments.map((c) => <CommentItem key={c.id} comment={c} />)
      )}
    </div>
  );
};