import React from 'react'

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
            <div className="dashboard-container">
                <div className="my-gifts">
                    <h3>My Gifts</h3>
                    <div className="gifts-container">
                        Here are the gifts shown (filterable by status?)
                    </div>
                </div>

                <div className="my-donations">
                    <h3>My Donations</h3>
                    <div className="donations-container">
                        Here are the donations shown (in a timeline?)
                    </div>
                </div>
            </div>
        )
    }
}