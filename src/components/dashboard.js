import React from 'react'

const userUrl = 'https://giftrit-service.herokuapp.com/api/users';

export default class UserDashboard extends React.Component {
    constructor (props) {
        super(props);
		
		let userId = 2; //TODO change when the userId is available this.props.userId;
		
        this.state = {
            gifts: [],
			donations: []			
        };
		
		fetch(userUrl + userId, {
			headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage['access_token']
            })
            .then(res => res.json())
            .then(data => {
                this.setState({ gifts : data.data.gifts, donations : data.data.donations });
            });						
    }

    render () {
		const gifts = this.state.gifts;
		const donations = this.state.donations;
		
		let giftContainer = null;
		let donationContainer = null;
		       			
		if (gifts.length > 0) {
			giftContainer = <div className="gift-container">
				{gifts.map(gift => {
					return (
						<a href={"giftdetail/" + gift.id} >
							<div className="title">{gift.title}</div>
						</a>
					)
				})}
			</div>;
		}
		if (donations.length > 0) {
			donationContainer = <div className="donation-container">
				{donations.map(donation => {
					return (						
						<div className="donation-item">
							<div className="donation-info">
								<div className="karma">You earned {donation.karma} kp</div>
								<div className="amount">You spent {donation.amount} CHF</div>
								<div className="date">Date {donation.created}</div>
								<div className="gift"><a href={"giftdetail/" + donation.giftId} >Go to gift</a></div>
							</div>
						</div>					
					)
				})}
			</div>;
		}	
		return (			
			<div className="dashboard-container">
				<div className="my-gifts">
					<h3>My Gifts</h3>
					<div className="gifts-container">
						{giftContainer}
					</div>
				</div>
				<div className="my-donations">
					<h3>My Donations</h3>
					<div className="donations-container">
						{donationContainer}
					</div>
				</div>
			</div>
		)
    }
}