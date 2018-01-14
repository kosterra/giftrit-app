import React from "react";
import NavHelper from '../components/nav-helper'
import Header from '../components/header'
import Footer from '../components/footer'
import ProfileEdit from '../components/profile-edit'

export default class ProfileEditPage extends React.Component {
    render() {
        return (
            <NavHelper>
                <Header />
                <ProfileEdit />
                <Footer />
            </NavHelper>
        )
    }
}