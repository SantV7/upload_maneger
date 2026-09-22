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
  const [ file, setFile ] = useState<File | null>(null);
  const [ loading, setLoading ] = useState(false);
  const [ errWarning, setErrWarning ] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setErrWarning('É necessário um arquivo!');
      return;
    }

    setErrWarning('');
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
        />
        
        <div className={`${styles.err_warning} ${errWarning ? styles.active : ''}`}>
          {errWarning}
        </div>


        <input 
          type="file" 
          id="fileInput"
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