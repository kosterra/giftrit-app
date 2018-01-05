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
            <div className="gift-detail">
                Dies ist das Detail für ein Gift mit einer kurzen Beschreibung:
                <br />
                Gift Titel: super
                <br />
                Eine kurze Beschreibung zum User ist auch enthalten.
                <br />
                Hier kann man auch für ein Geschenk spenden.
            </div>
        )
    }
}