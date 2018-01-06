import React from "react";
import NavHelper from '../components/nav-helper'
import Header from '../components/header'
import Footer from '../components/footer'
import GiftDetail from '../components/giftdetail'

export default class GiftDetailPage extends React.Component {
    render() {
        return (
            <NavHelper>
                <Header />
                <GiftDetail giftId={this.props.giftId} />
                <Footer />
            </NavHelper>
        )
    }
}