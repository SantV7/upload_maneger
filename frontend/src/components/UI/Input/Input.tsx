import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, style, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
      {label && <label style={{ fontSize: '13px', fontWeight: 500, color: '#374151' }}>{label}</label>}
      <input
        style={{
          width: '100%',
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #d1d5db',
          fontSize: '14px',
          outline: 'none',
          ...style,
        }}
        {...props}
      />
    </div>
  );
};