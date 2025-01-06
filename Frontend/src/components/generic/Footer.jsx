import React from 'react';
import '../../styles/generic/Footer.css'; // Archivo CSS para los estilos del footer

const Footer = () => {
  return (
    <footer className="global-footer">
      <p2>MENUBB &copy; {new Date().getFullYear()}</p2>
    </footer>
  );
};

export default Footer;