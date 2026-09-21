import React from 'react';
import { FiEye, FiDownload, FiMoreVertical } from 'react-icons/fi';

interface DocumentActionsProps {
  onView?: () => void;
  onDownload?: () => void;
}

export const DocumentActions: React.FC<DocumentActionsProps> = ({ onView, onDownload }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
      <button onClick={onView} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }} title="Visualizar">
        <FiEye size={16} />
      </button>
      <button onClick={onDownload} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }} title="Download">
        <FiDownload size={16} />
      </button>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
        <FiMoreVertical size={16} />
      </button>
    </div>
  );
};