import React, { useEffect, useState } from 'react';
import type { Document } from '../../types/document_types';
import { api } from '../../services/API';
import { Sidebar } from '../../app/sidebar/Sidebar';
import { DocumentTable } from '../../components/Documents/DocumentTable/DocumentTable';
import { UploadDocumentModal } from '../../components/Upload/UploadDocumentModal';
import { Button } from '../../components/UI/Button/Button';
import { Download } from 'lucide-react';
import styles from './Documents.module.css';

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upload' | 'documents'>('documents');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const loadDocuments = async () => {
    try {
      const data = await api.getDocuments();
      setDocuments(data);
      if (data.length > 0) {
        const currentSelectedId = selectedDoc?.id || data[0].id;
        const found = data.find(d => d.id === currentSelectedId) || data[0];
        const fullDoc = await api.getDocumentById(found.id);
        setSelectedDoc(fullDoc);
      } else {
        setSelectedDoc(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadInitialDocuments = async () => {
      try {
        const data = await api.getDocuments();
        setDocuments(data);

        if (data.length > 0) {
          const fullDoc = await api.getDocumentById(data[0].id);
          setSelectedDoc(fullDoc);
        }
      } catch (error) {
        console.error(error);
      }
    };

    void loadInitialDocuments();
  }, []);

  const handleSelectDoc = async (doc: Document) => {
    try {
      const fullDoc = await api.getDocumentById(doc.id);
      setSelectedDoc(fullDoc);
      setDocuments((currentDocuments) => currentDocuments.map((item) =>
        item.id === fullDoc.id ? { ...item, comments: fullDoc.comments } : item
      ));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteDocument(id);
      const remaining = documents.filter(doc => doc.id !== id);
      setDocuments(remaining);
      if (selectedDoc?.id === id) {
        if (remaining.length > 0) {
          const fullDoc = await api.getDocumentById(remaining[0].id);
          setSelectedDoc(fullDoc);
        } else {
          setSelectedDoc(null);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (doc: Document) => {
    setEditingDoc(doc);
    setNewTitle(doc.title);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc || !newTitle.trim()) return;

    try {
      await api.updateDocument(editingDoc.id, newTitle);
      const fullDoc = await api.getDocumentById(editingDoc.id);
      setDocuments(documents.map(d => d.id === editingDoc.id ? fullDoc : d));
      if (selectedDoc?.id === editingDoc.id) {
        setSelectedDoc(fullDoc);
      }
      setIsEditModalOpen(false);
      setEditingDoc(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!selectedDoc) return;
    try {
      await api.addComment(selectedDoc.id, content);
      const fullDoc = await api.getDocumentById(selectedDoc.id);
      setSelectedDoc(fullDoc);
      setDocuments((currentDocuments) => currentDocuments.map((item) =>
        item.id === fullDoc.id ? { ...item, comments: fullDoc.comments } : item
      ));
    } catch (error) {
      console.error(error);
    }
  };

  const getCleanFileName = (filePath?: string) => {
    if (!filePath) return 'Desconhecido';
    const parts = filePath.split(/[/\\]/);
    const fullName = parts[parts.length - 1];
    const cleanName = fullName.replace(/^\d+-\d+-/, '');
    return cleanName;
  };

  return (
    <div className={styles.container}>
      <Sidebar 
        onOpenUpload={() => setIsModalOpen(true)} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalDocuments={documents.length}
      />
      
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Documentos</h1>
          <p>Gerencie seus arquivos e acompanhe os comentários.</p>
        </header>

        <div className={styles.contentGrid}>
          <div className={styles.tableWrapper}>
            <DocumentTable 
              documents={documents} 
              onSelectDocument={handleSelectDoc} 
              selectedId={selectedDoc?.id} 
              onDelete={handleDelete}
              onEdit={handleEditClick}
              onAddComment={handleAddComment}
            />
          </div>

          <div className={styles.detailsPanel}>
            {selectedDoc ? (
              <div className={styles.previewCard}>
                <strong>{selectedDoc.title}</strong>
                <div className={styles.fileDetails}>
                  <span><strong>Nome do arquivo:</strong> {getCleanFileName(selectedDoc.filePath)}</span>
                  <span><strong>Extensão:</strong> {selectedDoc.filePath?.split('.').pop()?.toUpperCase()}</span>
                </div>
                <a href={api.getDownloadUrl(selectedDoc.id)}>
                  <Button variant="primary">
                    <Download size={18} />
                    Baixar arquivo
                  </Button>
                </a>

              </div>
            ) : (
              <p className={styles.noSelection}>Selecione um documento ao lado para ver os detalhes e comentários.</p>
            )}
          </div>
        </div>
      </main>

      <UploadDocumentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadDocuments} 
      />

      {isEditModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Editar Título do Documento</h3>
            <form onSubmit={handleSaveEdit}>
              <input 
                type="text" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
                className={styles.modalInput}
                autoFocus
              />
              <div className={styles.modalActions}>
                <Button type="button" variant="secondary" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
