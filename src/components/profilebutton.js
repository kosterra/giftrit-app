import React from 'react';

const LoginButtons = () => (
    <div className="profile-dropdown">
        <img src="https://cdn.filestackcontent.com/0yoR223ESPujrXJYx1Ae" alt="the profile"/>
        <div className="profile-karma karma gkp">200 gkp!</div>
        <div className="dropdown-content">
            <ul className="user-menu">
                <li><a href={"/profile-edit/" + 2}>Edit Profile</a></li>
                <li><a href="https://github.com/ralphkoster/giftrit-app/wiki">Help</a></li>
                <li><a href="/logout">Logout</a></li>
            </ul>
        </div>
    </div>
);

export default LoginButtons;
