import React from 'react';
import type { Comment } from '../../../types/document_types';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '13px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, color: '#111827' }}>Usuário</span>
        <span style={{ fontSize: '11px', color: '#9ca3af' }}>{comment.createdAt}</span>
      </div>
      <p style={{ color: '#4b5563', margin: 0 }}>{comment.text}</p>
    </div>
  );
};