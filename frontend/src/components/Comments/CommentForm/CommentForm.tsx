import React, { useState } from 'react';
import { Button } from '../../UI/Button/Button';
import styles from './CommnetForm.module.css';

interface CommentFormProps {
  onSubmitComment: (content: string) => void;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onSubmitComment }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmitComment(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input 
        type="text" 
        placeholder="Adicione um comentário..." 
        value={content} 
        onChange={(e) => setContent(e.target.value)}
        className={styles.input}
      />
      <Button variant="primary" type="submit">Enviar</Button>
    </form>
  );
};