import React from "react";
import NavHelper from '../components/nav-helper'
import Header from '../components/header'
import Footer from '../components/footer'
import UserDashboard from '../components/dashboard'

export default class UserDashboardPage extends React.Component {
    render() {
        return (
            <NavHelper>
                <Header />
                <UserDashboard />
                <Footer />
            </NavHelper>
        )
    }
}