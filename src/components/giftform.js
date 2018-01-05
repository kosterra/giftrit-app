import React from 'react'
import '../stylesheets/components/_giftform.scss';

const url = 'https://giftrit-service.herokuapp.com/api/gifts';

export default class GiftForm extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            giftItem: ''
        };
    }

    render () {
        return (
            <div className="gift-form">
                Dies ist das Formular um ein neues Gift zu erstellen.
            </div>
        )
    }
}