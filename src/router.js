import Router from 'ampersand-router'
import PublicPage from './pages/public'
import LoginPage from './pages/login'
import React from 'react'
import ReactDOM from 'react-dom'

export default Router.extend({
  routes: {
    '':'public',
    'login':'login',
    'giftrs': 'giftrs'
  },

  public() {
    ReactDOM.render(<PublicPage/>,  document.getElementById('root'))
    console.log("on public page");
  },

  login() {
    ReactDOM.render(<LoginPage/>,  document.getElementById('root'))
    console.log("on login page");
  }
})
