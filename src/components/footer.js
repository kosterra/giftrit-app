import React from 'react';
import ContactForm from './contactform';
import logo from '../images/logo.svg';

const Footer = () => (
    <footer className="footer-distributed">

        <div className="footer-left">

            <p className="footer-company">
                <a href='/' >
                    <img alt="Giftr.it Logo" src={logo} className="logo-img" />
                    <span className="logo-text">Giftr.it</span>
                </a>
            </p>

            <p className="footer-links">
                <a href="#">About Us</a>
                <a href="https://github.com/ralphkoster/giftrit-app/wiki">FAQ</a>
                <a href="#">Impressum</a>
            </p>

            <p className="footer-company-name">FFHS &copy; 2017</p>

            <div className="footer-icons">
                <a href="https://github.com/ralphkoster/giftrit-app" title="Besuche uns auf Github"><i className="fa fa-github"></i></a>
            </div>
        </div>

        <div className="footer-right">
            <ContactForm />
        </div>

    </footer>
);

export default Footer;