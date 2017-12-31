import React from 'react'

export default class LogoutPage extends React.Component {
  render() {
    window.app.auth.logout();
    return null;
  }
}
