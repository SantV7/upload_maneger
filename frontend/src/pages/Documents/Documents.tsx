import React, { useEffect, useState } from 'react';
import type { Document } from '../../types/document_types';
import { api } from '../../services/API';
import { Sidebar } from '../../app/sidebar/Sidebar';
import { DocumentTable } from '../../components/Documents/DocumentTable/DocumentTable';
import { UploadDocumentModal } from '../../components/Upload/UploadDocumentModal';
import { Button } from '../../components/UI/Button/Button';
import styles from './Documents.module.css';
import { CommentItem } from '../../components/Comments/CommenttItem/CommentItem';
import { CommentForm } from '../../components/Comments/CommentForm/CommentForm';

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upload' | 'documents'>('documents');

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

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleSelectDoc = async (doc: Document) => {
    try {
      const fullDoc = await api.getDocumentById(doc.id);
      setSelectedDoc(fullDoc);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!selectedDoc) return;
    try {
      await api.addComment(selectedDoc.id, content);
      handleSelectDoc(selectedDoc);
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
          <div className={styles.tableWrapper}>
            <DocumentTable 
              documents={documents} 
              onSelectDocument={handleSelectDoc} 
              selectedId={selectedDoc?.id} 
            />
          </div>

          {selectedDoc && (
            <div className={styles.detailsPanel}>
              <div className={styles.previewCard}>
                <strong>{selectedDoc.title}</strong>
                <a href={api.getFileUrl(selectedDoc.filePath)} target="_blank" rel="noreferrer">
                  <Button variant="primary">Visualizar / Download</Button>
                </a>
              </div>

              <div className={styles.commentsSection}>
                <h3>Comentários</h3>
                <div className={styles.commentList}>
                  {selectedDoc.comments?.map((comment) => (
                    <CommentItem key={comment.id} text={comment.text} createdAt={comment.createdAt} />
                  ))}
                </div>
                <CommentForm onSubmitComment={handleAddComment} />
              </div>
            </div>
          )}
        </div>
      </main>

      <UploadDocumentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadDocuments} 
      />
    </div>
  );
};