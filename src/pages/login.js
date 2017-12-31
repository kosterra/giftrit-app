import Auth from '../helpers/auth/auth';
import React from 'react'

export default class LoginPage extends React.Component {
  render() {
    const auth = new Auth();
    auth.login();
    return null;
  }
}
