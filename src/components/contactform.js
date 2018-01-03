import React from 'react';
import '../stylesheets/components/_contactform.scss';

export default class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: "", message: "" };
    }

    handleSubmit = e => {
        fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: this.state
        })
            .then(() => alert("Success!"))
            .catch(error => alert(error));

        e.preventDefault();
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {
        const { email, message } = this.state;
        return (
            <div className="contactform">

                <p>Kontaktiere uns</p>

                <form onSubmit={this.handleSubmit}>

                    <input type="email" name="email" value={email} onChange={this.handleChange} placeholder="Email" />
                    <textarea name="message" value={message} onChange={this.handleChange} placeholder="Mitteilungg" />
                    <button>Senden</button>

                </form>
            </div>
        )
    }
}