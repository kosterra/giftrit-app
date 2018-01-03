import React from 'react';
import '../stylesheets/components/_contactform.scss';

export default class ContactForm extends React.Component {


    render() {
        const { email, message } = this.state;
        return (
            <div className="contactform">

                <p>Kontaktiere uns</p>

                <form onSubmit={this.handleSubmit}>

                    <input type="email" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
                    <textarea name="message" value={message} onChange={this.handleChange} placeholder="Mitteilung" />
                    <button>Senden</button>

                </form>
            </div>
        )
    };
}