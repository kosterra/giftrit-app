import React from 'react';
import logo from '../images/logo.svg';
import LoginButtons from './loginbuttons';
import LogoutButtons from './logoutbuttons';

export default class Header extends React.Component {

  render()
  {
    const { isAuthenticated } = window.app.auth;
    return(
    <header className="header-distributed">

        <div className="header-limiter">
            <div className="company-logo">
                <img alt="Giftr.it Logo" src={logo} className="logo-img" />
                <span className="logo-text">Giftr.it</span>
            </div>
            {
              !isAuthenticated() && (
                    <LoginButtons />
                )
            }
            {
              isAuthenticated() && (
                    <LogoutButtons />
                )
            }
        </div>
    </header>
  )};
}
