import React from 'react'
import GiftList from "./giftlist";

const userUrl = 'https://giftrit-service.herokuapp.com/api/users/';
const giftDonationsUrl = 'https://giftrit-service.herokuapp.com/api/gift/1/donations';

export default class UserDashboard extends React.Component {
    constructor (props) {
        super(props);

        this.showMoreGifts = this.showMoreGifts.bind(this);
        this.showMoreDonations = this.showMoreDonations.bind(this);

		let userId = 2; //TODO change when the userId is available this.props.userId;
		
        this.state = {
            gifts: [],
			donations: [],
            giftsLimit: 4,
            showMoreGifts: true,
			donationsLimit: 3,
			showMoreDonations: true
        };
		
		fetch(userUrl + userId, {
			headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage['access_token']
			}
		})
        .then(res => res.json())
        .then(data => {
			this.setState({
				gifts : data.data.gifts,
				donations : data.data.donations,
				showMoreGifts: this.state.giftsLimit < data.data.gifts.length,
				showMoreDonations: this.state.donationsLimit < data.data.donations.length,
			});
        });
    }

    showMoreGifts() {
        this.setState({
            giftsLimit: this.state.giftsLimit + 4,
            showMoreGifts: this.state.giftsLimit < this.state.gifts.length
        });
    }

    renderGiftsButton() {
        // show button only if state.showMore set to true
        if (!this.state.showMoreGifts) {
            return null;
        }
        return (
            <button onClick={this.showMoreGifts}>More Gifts</button>
        );
    }

    showMoreDonations() {
        this.setState({
            donationsLimit: this.state.donationsLimit + 3,
            showMoreDonations: this.state.donationsLimit < this.state.donations.length
        });
    }

    renderDonationsButton() {
        // show button only if state.showMore set to true
        if (!this.state.showMoreDonations) {
        	return null;
        }
        return (
            <button onClick={this.showMoreDonations}>More Donations</button>
        );
    }

    calculatePercent(amount, donated) {
        return ((donated / amount) * 100).toFixed(0);
    }

    calculateAmountCSSClass(amount, donated) {
        let percentage = this.calculatePercent(amount, donated);
        return percentage < 33 ? 'low' : percentage < 66 ? 'middle' : 'high';
    }

    render () {
		const gifts = this.state.gifts;
		const donations = this.state.donations;
		
		let giftContainer = null;
		let donationContainer = null;
		       			
		if (gifts.length > 0) {
			giftContainer = <div className="gift-container">
				{gifts.slice(0, this.state.giftsLimit).map(gift => {
					return (
						<div className="gift-item" key={gift.id} >
                            <div className="gift-info">
                                <div className="title" title={gift.title}>{GiftList.shorten(gift.title, 30)}</div>
                                <div className="description" title={gift.description}>{GiftList.shorten(gift.description, 95)}</div>
                                <div className="amountinfo">
                                    <div className="amount">
                                        <span className="amount-label">full amount</span>
                                        <span className="karma gkp">{gift.amount} CHF</span>
                                    </div>
                                    <div className="donated">
                                        <span className="donated-label">donated so far</span>
                                        <span className={"amount " + this.calculateAmountCSSClass(gift.amount, gift.donatedamount)}>{gift.donatedamount && gift.donatedamount > 0 ? gift.donatedamount : 0} CHF</span>
                                    </div>
                                </div>
                                <div className="actions-percent">
                                    <div className="actions">
                                        <a href={"/giftdetail/" + gift.id} className="fa fa-eye" />
                                        <a href={"/giftform/" + gift.id} className="fa fa-pencil" />
                                        <a href={"/giftform/"} className="fa fa-trash" />
                                    </div>
                                    <div className="percent">
                                        <div>{this.calculatePercent(gift.amount, gift.donatedamount)}%</div>
                                    </div>
                                </div>
                            </div>
						</div>
					)
				})}
			</div>;
		}

		if (donations.length > 0) {
			donationContainer = <div className="donation-container">
				{donations.reverse().slice(0, this.state.donationsLimit).map(donation => {
					return (						
						<div className="donation-item" key={donation.id}>
							<div className="donation-info">
								<div className="date">{("0" + (new Date(donation.created).getDay() + 1)).slice(-2) + '.' + ("0" + (new Date(donation.created).getMonth() + 1)).slice(-2) + '.' + new Date(donation.created).getFullYear()}</div>
                                <div className="amount">
                                    <span className="amount-label">You spent</span>
                                    <span className="karma gkp">{donation.amount} CHF</span>
                                </div>
								<div className="karma">
                                    <span className="karma-label">You earned</span>
                                    <span className="karma gkp">{donation.karma} gkp</span>
                                </div>
								<div className="gift"><a href={"giftdetail/" + donation.giftid} >Show this gift</a></div>
							</div>
						</div>
					)
				})}
			</div>;
		}	
		return (			
			<div className="dashboard-container">
				<div className="my-gifts">
					<h2>My Gifts</h2>
					<div className="gifts-container">
						{giftContainer}
					</div>
                    <div className="gifts-showmore">
                        { this.renderGiftsButton() }
                    </div>
				</div>
				<div className="my-donations">
					<h2>My Donations</h2>
					<div className="donations-container">
						{donationContainer}
					</div>
                    <div className="donations-showmore">
                    	{ this.renderDonationsButton() }
					</div>
				</div>
			</div>
		)
    }
}