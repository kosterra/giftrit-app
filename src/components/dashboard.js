import React from 'react'

const userUrl = 'https://giftrit-service.herokuapp.com/api/users';

export default class UserDashboard extends React.Component {
    constructor (props) {
        super(props);
		
		let userId = 2; //TODO change when the userId is available this.props.userId;
		
        this.state = {
            giftItems: [],
			donations: []			
        };
		
		fetch(userUrl + userId)
            .then(res => res.json())
            .then(data => {
                this.setState({ giftItems : data.data.giftItems, donations : data.data.donations });
            });						
    }

    render () {
		const giftItems = this.state.giftItems;
		const donations = this.state.donations;
		
		let giftContainer = null;
		let donationsContainer = null;
		       			
		if (giftItems.length > 0) {
			giftContainer = <div className="gift-container">
				{giftItems.map(gift => {
					return (
						<a href={"giftdetail/" + gift.id} >
							<div className="gift-item" key={gift.id} style={{backgroundImage: "url(" + gift.imageurl + ")"}} >
								<div className="gift-info">
									<div className="title">{gift.title}</div>
									<div className="description" title={gift.description}>{gift.shorten(gift.description, 40)}</div>
									<div className="userinfo">by <span className="username">username</span></div>
								</div>
							</div>
						</a>
					)
				})}
			</div>;
		}
		if (donations.length > 0) {
			donationsContainer = <div className="donation-container">
				{donations.map(donation => {
					return (
						<a href={"giftdetail/" + donation.id} >
							<div className="donation-item">
								<div className="donation-info">
									<div className="karma">You earned {donation.karma} kp</div>
									<div className="amount">You spent {donation.amount} CHF</div>
									<div className="date">Date {donation.created}</div>
									<div className="gift"><a href={"giftdetail/" + donation.giftId} >Go to gift</a></div>
								</div>
							</div>
						</a>
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
						{donationsContainer}
					</div>
				</div>
			</div>
		)
    }
}