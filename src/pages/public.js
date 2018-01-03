import React from 'react';
import NavHelper from '../components/nav-helper'
import Header from '../components/header'
import Footer from '../components/footer'
import GiftList from '../components/giftlist'

export default class PublicPage extends React.Component {
  render() {
    return (
      <NavHelper>
        <Header />
        <GiftList />
        <Footer />
      </NavHelper>
    )
  }
}
