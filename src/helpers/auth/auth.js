import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'innt.eu.auth0.com',
    clientID: 'tOHfuMS83ZQZ5KNk1ENI4RK2PWYVUgAw',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://innt.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login() {
    this.auth0.authorize();
  }
}
