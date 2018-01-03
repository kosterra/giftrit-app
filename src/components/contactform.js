import React from 'react';
import '../stylesheets/components/_contactform.scss';

const ContactForm = () => (
    <div className="contactform">

        <p>Kontaktiere uns</p>

        <form action="#" method="post">

            <input type="text" name="email" placeholder="Email" />
            <textarea name="message" placeholder="Mitteilung"></textarea>
            <button>Senden</button>

        </form>
    </div>
);

export default ContactForm;