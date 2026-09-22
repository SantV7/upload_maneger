import React, { useState } from 'react';
import { Modal } from '../UI/Modal/Modal';
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Button/Button';
import { api } from '../../services/API';

interface UploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UploadDocumentModal: React.FC<UploadProps> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file ) return;
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      await api.uploadDocument(formData);
      onSuccess();
      onClose();
      setTitle('');
      setFile(null);
    } catch (error) {
        console.error(error);
    } finally {
      setTitle('')
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Enviar Novo Documento">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Input 
          label="Título" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Nome do documento" 
        />
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'A enviar...' : 'Enviar'}
        </Button>
      </form>
    </Modal>
  );
};