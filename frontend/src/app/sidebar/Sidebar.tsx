import React, { useState } from 'react';
import { Button } from '../../components/UI/Button/Button';
import styles from './Sidebar.module.css';
import { File, FileText, DiamondPlus } from 'lucide-react';

interface SidebarProps {
  onOpenUpload: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenUpload }) => {
  const [ docIcon, setDocIcon ] = useState<boolean>(false);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h1>Your</h1>
        <h2>DocumentFlow</h2>
      </div>
      <hr />
      <nav className={styles.nav}>
        <a href="documents" onMouseEnter={() => setDocIcon(true)} 
  onMouseLeave={() => setDocIcon(false)}  className={styles.active}>Documentos {docIcon ? <FileText color='rgb(73, 73, 251)' size={23} /> : <File color='rgb(147, 147, 252)' size={23}/>}</a>
      </nav>
      <div className={styles.action}>
        <Button variant="primary" onClick={onOpenUpload}><DiamondPlus /> Novo documento</Button>
      </div>
    </aside>
  );
};