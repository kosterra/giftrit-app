import React from 'react'

const giftUrl = 'https://giftrit-service.herokuapp.com/api/gifts/';
const donationUrl = 'https://giftrit-service.herokuapp.com/api/donations/';
const userUrl = 'https://giftrit-service.herokuapp.com/api/users/';

export default class GiftDetail extends React.Component {
    constructor (props) {
        super(props);

        let giftId = this.props.giftId;

        this.showMoreDonations = this.showMoreDonations.bind(this);

        this.state = {
            giftItem: '',
            giftUser: '',
            giftDonations: [],
            donation: '',
			donationResult: '',
            karmapoints: 0,
			user: null,
			created: new Date().toISOString().slice(0,10),
            donationsLimit: 4,
            showMoreDonations: true
        };

        fetch(giftUrl + giftId)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    giftItem : data.data,
                    giftUser : data.data.user,
                    giftDonations : data.data.donations,
                    showMoreDonations: this.state.donationsLimit < data.data.donations.length
                });
            });
		
		//TODO enable when user-accounts are available
		/*fetch(userUrl + window.localStorage['id_token'])
            .then(res => res.json())
            .then(data => {
                this.setState({ user : data.data });
            });*/
    }
	
	handleSubmit = e => {
        fetch(donationUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage['access_token']
            },
            body: JSON.stringify({
                giftId: this.state.giftItem.id,
                amount: this.state.donation,
                created: this.state.created,
                userId: 2, //TODO change when user-id is available -> this.state.user.id
				karma: this.calculateKarma(this.state.donation) //TODO why?? which value?? 
            })
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }			
			this.state.donationResult = 'Donation sent successfully. Thank you!';
            //window.app.Router.redirectTo('/');
        }).catch(error => {
            this.setState({
                giftId: this.state.giftItem.id,
                amount: this.state.donation,
                created: this.state.created,
                userId: 2, //TODO change when user-id is available -> this.state.user.id,
				karma: this.calculateKarma(this.state.donation), //TODO why?? which value?? 
                type: 'danger',
                message: 'Failed to donate. Please try again or contact us via contact form.'
            });
            console.log("Failed to donate! " + error.message);
        });

        e.preventDefault();
    };

    handleChange = e => {
        this.calculateKarma(e.target.value);

        this.setState({
            [e.target.name]: e.target.value
        });
    };

    calculateKarma(amount) {
        fetch('https://giftrit-service.herokuapp.com/api/karmas')
            .then(res => res.json())
            .then(data => {
                let karmapoints = 0;
                let karmas = data.data;

                for (let i = 0; i < karmas.length; i++) {
                    let karma = karmas[i];

                    if (parseInt(karma.amount, 0) <= amount) {
                        karmapoints = karma.karmapoints;
                    }
                }

                this.setState({ karmapoints : karmapoints });
            });
    }

    showMoreDonations() {
        this.setState({
            donationsLimit: this.state.donationsLimit + 3,
            showMoreDonations: this.state.donationsLimit < this.state.giftDonations.length
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

    render () {
		let donatedAmount = (this.state != null && this.state.giftItem != null && this.state.giftItem.donatedamount != null) ? this.state.giftItem.donatedamount.toFixed(2) : '0.00';
		const { isAuthenticated } = window.app.auth;

        let donationContainer = null;

        if (this.state.giftDonations.length > 0) {
            donationContainer = <div className="donation-container">
                {this.state.giftDonations.reverse().slice(0, this.state.donationsLimit).map(donation => {
                    return (
                        <div className="donation-item">
                            <div className="donation-info">
                                <div className="date">{("0" + (new Date(donation.created).getDay() + 1)).slice(-2) + '.' + ("0" + (new Date(donation.created).getMonth() + 1)).slice(-2) + '.' + new Date(donation.created).getFullYear()}</div>
                                <div className="amount">
                                    <span className="amount-label">User spent</span>
                                    <span className="karma gkp">{donation.amount} CHF</span>
                                </div>
                                <div className="karma">
                                    <span className="karma-label">User earned</span>
                                    <span className="karma gkp">{donation.karma} gkp</span>
                                </div>
                                <div className="user">
                                    by {donation.userid}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>;
        } else {
            donationContainer = <div className="alert-info">This gift is still not donated. Sorry!</div>
        }

        return (
            <div className="gift-detail-container">
                <div className="gift-user-container">
                    <div className="gift-detail">
                        <div className="gift-info-donation">
                            <div className="gift-images">
                                <img src={this.state.giftItem.imageurl} alt="the gift"/>
                            </div>
                            <form className="gift-donate-form" onSubmit={this.handleSubmit}>
                                <div className="gift-details">
                                    <h2 className="name">{this.state.giftItem.title}</h2>
                                    <div className="donated-amount">
                                        <span className="donated-amount-label">Donated so far</span>
                                        <span className="karma gkp">{donatedAmount} CHF</span>
                                    </div>
                                    <div className="donation">
                                        <span>Donate now</span>
                                        <input type="number" name="donation" value={this.state.donation} onChange={this.handleChange} className="donate-input" placeholder="CHF"/>
                                        {
                                            isAuthenticated() && <button className="donate-button">Giftr it!</button>
                                        }
                                        {
                                            !isAuthenticated() && <a href="/login" className="login-button">Login to donate</a>
                                        }
                                        <div className="result">{this.state.donationResult}</div>
                                    </div>
                                    <div className="karma">This gift will earn you <span className="karma gkp">{this.state.karmapoints} gkp!</span></div>
                                </div>
                            </form>
                        </div>
                        <div className="gift-description">
                            {this.state.giftItem.description}
                        </div>
                    </div>
                    <div className="gift-user">
                        <div className="user-info">
                            <div className="user-image">
                                <img src="https://cdn.filestackcontent.com/0yoR223ESPujrXJYx1Ae" alt="the profile"/>
                            </div>
                            <div className="user-details">
                                <h3 className="name">{this.state.giftUser.firstname + ' ' + this.state.giftUser.lastname}</h3>
                                <div className="karma-history" >
                                    <div className={"karma " + (this.state.giftUser.karma > 0 ? 'gkp' : 'bkp')}>
                                        {this.state.giftUser.karma} {this.state.giftUser.karma > 0 ? 'gkp!' : 'bkp!'}
                                    </div>

                                    <div className="gift-history">Show gift history</div>
                                </div>
                            </div>
                        </div>
                        <div className="user-description">
                            {this.state.giftUser.description}
                        </div>
                    </div>
                </div>
                <div className="donations-container">
                    <h2>Donation history</h2>
                    {donationContainer}
                    <div className="donations-showmore">
                        { this.renderDonationsButton() }
                    </div>
                </div>
            </div>
        )
    }
}