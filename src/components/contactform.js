import React from 'react';
import '../stylesheets/components/_contactform.scss';

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { from: "", text: "", type: '', message: '' };
    }

    handleSubmit = e => {
        fetch('https://giftrit-service.herokuapp.com/api/contact', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'accept': 'application/json'},
            body: JSON.stringify({
                from: this.state.from,
                text: this.state.text
            })
        });

        this.setState({
            from: "",
            text: "",
            type: 'success',
            message: 'Vielen Dank für deine Kontaktanfrage'
        });

        e.preventDefault();
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        if (this.state.type && this.state.message) {
            let classString = 'alert alert-' + this.state.type;
            var status = <div id="status" className={classString} ref="status">
                {this.state.message}
            </div>;
        }

        return (
            <div className="contactform">

                {status}

                <p>Kontaktiere uns</p>

                <form id="contactform" onSubmit={this.handleSubmit}>

                    <input type="email" name="from" value={this.state.from} onChange={this.handleChange} placeholder="E-Mail" />
                    <textarea name="text" value={this.state.text} onChange={this.handleChange} placeholder="Mitteilung" />
                    <button>Senden</button>

                </form>
            </div>
        )
    }
}