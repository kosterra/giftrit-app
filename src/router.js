import Router from 'ampersand-router'
import PublicPage from './pages/public'
import LoginPage from './pages/login'
import LogoutPage from './pages/logout'
import GiftDetailPage from './pages/giftdetail'
import GiftFormPage from './pages/giftform'
import React from 'react'
import ReactDOM from 'react-dom'


// http://localhost:3000/callback#error=unauthorized&error_description=Access%20denied.&state=GxO-Fx3LcToiw33kVY3sVv-NL2-gaHjn

export default Router.extend({
  routes: {
    '':'public',
    'login':'login',
    'logout':'logout',
    'giftrs': 'giftrs',
    'callback': 'callback',
    'giftdetail':'giftdetail',
    'giftform':'giftform'
  },

  public() {
    ReactDOM.render(<PublicPage/>,  document.getElementById('root'));
    console.log("on public page");
  },

  login() {
    ReactDOM.render(<LoginPage/>,  document.getElementById('root'));
    console.log("on login page");
  },

  callback() {
    console.log(window.location.hash.slice(1));
    window.app.auth.handleAuthentication(window.location.hash.slice(1));
    ReactDOM.render(<PublicPage/>,  document.getElementById('root'))
  },

  logout() {
    ReactDOM.render(<LogoutPage/>,  document.getElementById('root'));
    console.log("on login page");
  },

  giftdetail() {
      ReactDOM.render(<GiftDetailPage/>,  document.getElementById('root'));
      console.log("on gift detail page");
  },

  giftform() {
      ReactDOM.render(<GiftFormPage/>,  document.getElementById('root'));
      console.log("on gift form page");
  }
})
