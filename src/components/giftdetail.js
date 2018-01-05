import React from 'react'
import '../stylesheets/components/_giftdetail.scss';

const url = 'https://giftrit-service.herokuapp.com/api/gifts';

export default class GiftDetail extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            giftItem: ''
        };
    }

    render () {
        return (
            <div className="gift-detail-container">
                <div className="gift-detail">
                    <div className="gift-info-donation">
                        <div className="gift-images">
                            <img src="https://www.urlaubsguru.de/wp-content/uploads/2016/03/urlaubsguru.de_bahamas-2.jpg" alt="Mountain View"/>
                        </div>
                        <form className="gift-donate-form">
                            <div className="gift-details">
                                <h2 className="name">Ferien auf den Bahamas</h2>
                                <div className="donation">
                                    <span>Donate now</span>
                                    <input className="donate-input" type="text" placeholder="CHF"/>
                                    <button className="donate-button">Giftr it!</button>
                                </div>
                                <div className="karma">This gift will earn you <span>150 gkp!</span></div>
                            </div>
                        </form>
                    </div>
                    <div className="gift-description">
                        This is the gift description
                    </div>
                </div>
                <div className="gift-user">
                    <div className="user-info">
                        <div className="user-image">
                            <img src="http://www.kodefork.com/static/users/images/user.png" alt="Mountain View"/>
                        </div>
                        <div className="user-details">
                            <div className="username">Samuel Eggenberger</div>
                            <div className="karma">250 bkp</div>

                            <div className="gift-history">Show gift history</div>
                        </div>
                    </div>
                    <div className="user-description">
                        This is the user description
                    </div>
                </div>
            </div>
        )
    }
}