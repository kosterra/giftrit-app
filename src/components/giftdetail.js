import React from 'react'

const url = 'https://giftrit-service.herokuapp.com/api/gifts/';
const donationUrl = 'https://giftrit-service.herokuapp.com/api/donations/';

export default class GiftDetail extends React.Component {
    constructor (props) {
        super(props);

        let giftId = this.props.giftId;

        this.state = {
            giftItem: '',
            giftUser: '',
            donation: '',
            karmapoints: 0
        };

        fetch(url + giftId)
            .then(res => res.json())
            .then(data => {
                this.setState({ giftItem : data.data, giftUser : data.data.user });
            });
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
                giftId: this.jsonEscape(this.state.giftItem.id),                
                amount: this.state.amount,
                created: this.state.created,                
                userId: 2
            })
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            window.app.Router.redirectTo('/');
        }).catch(error => {
            this.setState({
                giftId: this.jsonEscape(this.state.giftItem.id),                
                amount: this.state.amount,
                created: this.state.created,                
                userId: 2,
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

                    if (parseInt(karma.amount) <= amount) {
                        karmapoints = karma.karmapoints;
                    }
                }

                this.setState({ karmapoints : karmapoints });
            });
    }

    render () {
        return (
            <div className="gift-detail-container">
                <div className="gift-detail">
                    <div className="gift-info-donation">
                        <div className="gift-images">
                            <img src={this.state.giftItem.imageurl} alt="the gift"/>
                        </div>
                        <form className="gift-donate-form" onSubmit={this.handleSubmit}>
                            <div className="gift-details">
                                <h2 className="name">{this.state.giftItem.title}</h2>
								<div className="donated-amount">Donated so far {this.state.donatedAmount} CHF</div>
                                <div className="donation">
                                    <span>Donate now</span>
                                    <input type="number" name="donation" value={this.state.donation} onChange={this.handleChange} className="donate-input" placeholder="CHF"/>
                                    <button className="donate-button">Giftr it!</button>
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
        )
    }
}