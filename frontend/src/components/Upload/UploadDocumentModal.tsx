import React, { useState } from 'react';
import { FolderSearch } from 'lucide-react';
import { Modal } from '../UI/Modal/Modal';
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Button/Button';
import { api } from '../../services/API';
import styles from './UploadDoc.module.css';

interface UploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UploadDocumentModal: React.FC<UploadProps> = ({ isOpen, onClose, onSuccess }) => {
  const [ title, setTitle ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ file, setFile ] = useState<File | null>(null);
  const [ loading, setLoading ] = useState(false);
  const [ errWarning, setErrWarning ] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setErrWarning('Informe o título do documento.');
      return;
    }

    if (!file) {
      setErrWarning('É necessário selecionar um arquivo.');
      return;
    }

    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      setErrWarning('Envie um arquivo PDF, JPG ou PNG.');
      return;
    }

    setErrWarning('');
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());
      formData.append('file', file);

      await api.uploadDocument(formData);
      onSuccess();
      onClose();
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (error) {
      console.error(error);
      setErrWarning('Erro ao enviar o documento.');
    } finally {
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
          required
        />
        <Input
          label="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descreva brevemente o documento"
        />
        
        <div className={`${styles.err_warning} ${errWarning ? styles.active : ''}`}>
          {errWarning}
        </div>


        <input 
          type="file" 
          id="fileInput"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          style={{ display: 'none' }} 
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        />

        <div className={styles.fileUploadContainer}>
          <label htmlFor="fileInput" className={styles.customFileBtn}>
            <FolderSearch size={20} />
            Escolher arquivo
          </label>
          <span className={styles.fileName}>
            {file ? file.name : 'Nenhum arquivo escolhido'}
          </span>
        </div>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'A enviar...' : 'Enviar'}
        </Button>
      </form>
    </Modal>
  );
};
