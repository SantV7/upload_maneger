import React, { useState } from 'react';
import { Button } from '../../components/UI/Button/Button';
import styles from './Sidebar.module.css';
import { LayoutDashboard, ShipCargo, UploadCloud, FolderOpen, DiamondPlus, FileText, File } from 'lucide-react';

interface SidebarProps {
  onOpenUpload: () => void;
  activeTab: 'dashboard' | 'upload' | 'documents';
  setActiveTab: (tab: 'dashboard' | 'upload' | 'documents') => void;
  totalDocuments: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  onOpenUpload, 
  activeTab, 
  setActiveTab, 
  totalDocuments 
}) => {
  const [docIconHover, setDocIconHover] = useState<boolean>(false);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div>
          <h1>Your <ShipCargo className={styles.logo_icon} size={24}/></h1>
          <span>DocumentFlow</span>
        </div>
      </div>

      <div className={styles.actionTop}>
        <Button variant="primary" onClick={onOpenUpload}>
          <DiamondPlus size={18} /> Novo documento
        </Button>
      </div>
      
      <nav className={styles.nav}>
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.active : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Painel</span>
        </button>

        <button 
          onClick={() => {
            setActiveTab('upload');
            onOpenUpload();
          }}
          className={`${styles.navItem} ${activeTab === 'upload' ? styles.active : ''}`}
        >
          <UploadCloud size={18} />
          <span>Enviar Documento</span>
        </button>

        <button 
          onClick={() => setActiveTab('documents')}
          className={`${styles.navItem} ${activeTab === 'documents' ? styles.active : ''}`}
        >
          <FolderOpen size={18} />
          <span>Documentos</span>
          <span className={styles.badge}>{totalDocuments}</span>
        </button>

        <div 
          className={styles.navItem}
          onMouseEnter={() => setDocIconHover(true)}
          onMouseLeave={() => setDocIconHover(false)}
        >
          <span>Total</span>
          <span className={styles.totalBadge}>
            {totalDocuments} {docIconHover ? <FileText size={16} /> : <File size={16} />}
          </span>
        </div>
      </nav>
    </aside>
  );
};