import React from 'react';

const userUrl = 'https://giftrit-service.herokuapp.com/api/users/';

export default class ProfileButtons extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            user : ''
        };

        // TODO replace with users id or id_token
        fetch(userUrl + 2)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    user : data.data
                });
                console.log('from data' + data.data);
                console.log('from state' + this.state.user);
            });
    }

    render () {
        return (
            <div className="profile-dropdown">
                <img src={this.state.user.imageurl} alt="the profile"/>
                <div className={"profile-karma karma " + (this.state.user.karma < 1 ? 'bkp' : 'gkp')}>{this.state.user.karma + (this.state.user.karma <= 0 ? ' bkp' : ' gkp')}</div>
                <div className="dropdown-content">
                    <ul className="user-menu">
                        <li><a href={"/profile-edit/" + this.state.user.userid}>Edit Profile</a></li>
                        <li><a href="https://github.com/ralphkoster/giftrit-app/wiki">Help</a></li>
                        <li><a href="/logout">Logout</a></li>
                    </ul>
                </div>
            </div>
        )
    }
};