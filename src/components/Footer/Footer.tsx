import React from 'react';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <a href="https://github.com/Maxim-Gumeniuk"  target="_blank" rel="noreferrer">My GitHub</a>
        <p>created by: Maxim Gumeniuk</p>
      </div>
    </div>
  );
};

