import React, { useEffect, useState } from 'react';
import styles from './Documents.module.css';
import { DocumentTable } from '../../components/Documents/DocumentTable/DocumentTable';
import type { Document } from '../../types/document_types';
import { api } from '../../services/API';
import { Sidebar } from '../../app/sidebar/Sidebar';
import { Button } from '../../components/UI/Button/Button';

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState('documentos');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para o Modal de Edição Bonito
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const data = await api.getDocuments();
      setDocuments(data);
      if (data.length > 0 && !selectedDoc) {
        setSelectedDoc(data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteDocument(id);
      setDocuments(documents.filter(d => d.id !== id));
      if (selectedDoc?.id === id) {
        const remaining = documents.filter(d => d.id !== id);
        setSelectedDoc(remaining.length > 0 ? remaining[0] : null);
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
      const updated = await api.updateDocument(editingDoc.id, newTitle);
      setDocuments(documents.map(d => d.id === editingDoc.id ? updated : d));
      if (selectedDoc?.id === editingDoc.id) {
        setSelectedDoc(updated);
      }
      setIsEditModalOpen(false);
      setEditingDoc(null);
    } catch (error) {
      console.error(error);
    }
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
          <DocumentTable
            documents={documents}
            onSelectDocument={setSelectedDoc}
            selectedId={selectedDoc?.id}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        </div>
      </main>

      {/* Modal de Edição Personalizado */}
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