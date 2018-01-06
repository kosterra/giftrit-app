import React from 'react';

const url = 'https://giftrit-service.herokuapp.com/api/contact';

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { from: "", text: "", type: '', message: '' };
    }

    handleSubmit = e => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage['access_token']
            },
            body: JSON.stringify({
                from: this.state.from,
                text: this.state.text
            })
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(response => {
            this.setState({
                from: "",
                text: "",
                type: 'success',
                message: 'Thank you for the contact message.'
            });
            console.log("Message sent successfully! " + response);
        }).catch(error => {
            this.setState({
                from: this.state.from,
                text: this.state.text,
                type: 'danger',
                message: 'Failed to send contact message. Please try again.'
            });
            console.log("Failed to send message! " + error.message);
        });

        e.preventDefault();
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        let status = null;
        if (this.state.type && this.state.message) {
            let classString = 'alert alert-' + this.state.type;
            status = <div id="status" className={classString} ref="status">
                {this.state.message}
            </div>;
        }

        return (
            <div className="contactform">

                {status}

                <p>Contact us</p>

                <form id="contactform" onSubmit={this.handleSubmit}>

                    <input type="email" name="from" value={this.state.from} onChange={this.handleChange} placeholder="E-Mail" />
                    <textarea name="text" value={this.state.text} onChange={this.handleChange} placeholder="Message" />
                    <button>Send</button>

                </form>
            </div>
        )
    }
}