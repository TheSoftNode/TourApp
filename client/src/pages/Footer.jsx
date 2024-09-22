import React from 'react';
import logo_green from "../assets/img/logo-green.png";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src={logo_green} alt="Natour logo" />
      </div>
      <ul className="footer__nav">
        <li><a href="#">About us</a></li>
        <li><a href="#">Download apps</a></li>
        <li><a href="#">Become a guide</a></li>
        <li><a href="#">Careers</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <p className="footer__copyright">
        &copy; by Jonas Schmedtmann. Feel free to use this project for your own purposes, EXCEPT producing your own course or tutorials!
      </p>
    </footer>
  );
};

export default Footer;
