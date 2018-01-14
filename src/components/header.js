import React from 'react';
import logo from '../images/logo.svg';
import LoginButtons from './loginbuttons';
import LogoutButtons from './profilebutton';

export default class Header extends React.Component {

  render()
  {
    const { isAuthenticated } = window.app.auth;
    return(
    <header className="header-distributed">

        <div className="header-limiter">
            <a href='/' >
                <div className="company-logo">
                    <img alt="Giftr.it Logo" src={logo} className="logo-img" />
                    <span className="logo-text">Giftr.it</span>
                </div>
            </a>

            <div className="header-buttons">
            {
                isAuthenticated() && (
                    <a className="dashboard-button" href='/dashboard' title="My Dashboard">
                        <i className="fa fa-th" aria-hidden="true"></i>
                    </a>
                )
            }

            <a className="discover-button" href='/' title="Discover the gifts">
                <i className="fa fa-globe" aria-hidden="true"></i>
            </a>

            {
                isAuthenticated() && (
                    <a className="create-gift-button" href='/giftform' title="Create a new gift" >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </a>
                )
            }

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
        </div>
    </header>
  )};
}
