import React from 'react';
import '../../styles/generic/Footer.css'; // Archivo CSS para los estilos del footer

const Footer = () => {
  return (
    <footer className="global-footer">
      <p>MENUBB &copy; {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;