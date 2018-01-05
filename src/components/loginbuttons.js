import React from 'react';
import '../stylesheets/components/_loginbuttons.scss';

const LoginButtons = () => (
    <div className="login-buttons">
        <ul>
            <li><a href="login" className="loginbutton">Login</a></li>
            <li><a href="login">Sign up</a></li>
        </ul>
    </div>
);

export default LoginButtons;
