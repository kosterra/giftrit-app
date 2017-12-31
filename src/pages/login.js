import React from 'react'

export default class LoginPage extends React.Component {
  render() {
    window.app.auth.login();
    return null;
  }
}
