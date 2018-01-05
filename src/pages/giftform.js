import React from "react";
import NavHelper from '../components/nav-helper'
import Header from '../components/header'
import Footer from '../components/footer'
import GiftForm from '../components/giftform'

export default class GiftFormPage extends React.Component {
    render() {
        return (
            <NavHelper>
                <Header />
                <GiftForm />
                <Footer />
            </NavHelper>
        )
    }
}