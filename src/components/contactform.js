import React from 'react';
import '../stylesheets/components/_contactform.scss';

const ContactForm = () => (
    <div className="contactform">

        <p>Kontaktiere uns</p>

        <form action="https://giftrit-service.herokuapp.com/api/contact" method="POST">

            <input type="text" name="email" placeholder="Email" />
            <textarea name="message" placeholder="Mitteilung"></textarea>
            <button>Senden</button>

        </form>
    </div>
);

export default ContactForm;