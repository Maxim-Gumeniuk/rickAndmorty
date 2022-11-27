import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__content">
        <Link to="https://github.com/Maxim-Gumeniuk">My GitHub</Link>
        <p>created by: Maxim Gumeniuk</p>
      </div>
    </div>
  );
};

