import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

interface CommentFormProps {
  documentId: string;
  onAddComment: (text: string) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
      <input
        type="text"
        placeholder="Adicione um comentário..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', outline: 'none' }}
      />
      <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
        <FiSend size={14} />
      </button>
    </form>
  );
};