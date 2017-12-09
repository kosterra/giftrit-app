import React from 'react';
import logo from '../images/logo.svg';
import LoginButtons from './loginbuttons';

const Header = () => (
    <header className="header-distributed">

        <div className="header-limiter">
            <div className="company-logo">
                <img alt="Giftr.it Logo" src={logo} className="logo-img" />
                <span className="logo-text">Giftr.it</span>
            </div>

            <LoginButtons />
        </div>
    </header>
);

export default Header;