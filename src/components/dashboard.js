import React from 'react'
import '../stylesheets/components/_dashboard.scss';

const url = 'https://giftrit-service.herokuapp.com/api/gifts';

export default class UserDashboard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            giftItem: ''
        };
    }

    render () {
        return (
            <div className="user-dashboard">
                Dies ist das Dashboard wo der Benutzer seine Gifts verwalten kann
            </div>
        )
    }
}