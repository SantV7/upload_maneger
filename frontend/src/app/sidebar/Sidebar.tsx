import React from 'react';
import { Button } from '../../components/UI/Button/Button';
import styles from './Sidebar.module.css';

interface SidebarProps {
  onOpenUpload: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenUpload }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>DocuFlow</h2>
      </div>
      <nav className={styles.nav}>
        <a href="#" className={styles.active}>Documentos</a>
      </nav>
      <div className={styles.action}>
        <Button variant="primary" onClick={onOpenUpload}>+ Novo documento</Button>
      </div>
    </aside>
  );
};