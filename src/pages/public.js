import React from 'react';
import NavHelper from '../components/nav-helper'
import Header from '../components/header'
import Footer from '../components/footer'

export default class PublicPage extends React.Component {
  render() {
    return (
      <NavHelper className='container'>
        <Header />
        <div>Show a list of gifts at this point</div>
        <Footer />
      </NavHelper>
    )
  }
}
