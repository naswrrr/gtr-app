import React from 'react';

export default function Container({ children }) {
  return (
    <div className="container-wrapper">
      <h1 className="title-container">Biodata</h1>
      {children}
      <footer>
        <p>© 2026 - Politeknik Caltex Riau</p>
      </footer>
    </div>
  );
}
