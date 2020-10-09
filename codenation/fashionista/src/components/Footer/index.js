import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

import './styles.css';

export default () => (
  <footer>
    <div className="container footer">
      <h3>
        E-commerce desenvolvido como projeto prático do curso AceleraDev React
        da{' '}
        <a
          href="https://codenation.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Codenation
        </a>
      </h3>
      <h4 className="footer-author">
        Elaborado por Leonardo Victor Soares Medeiros
      </h4>
      <div className="footer-links">
        <a
          href="https://github.com/leovictorcvo/codenation"
          target="_blank"
          rel="noopener noreferrer"
          className="actions__link"
        >
          <FaGithub /> Github
        </a>
        <a
          href="https://www.linkedin.com/in/leonardo-medeiros-902986156/"
          target="_blank"
          rel="noopener noreferrer"
          className="actions__link"
        >
          <FaLinkedin /> Linkedin
        </a>
      </div>
    </div>
  </footer>
);
