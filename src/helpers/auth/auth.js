import auth0 from 'auth0-js';

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: 'innt.eu.auth0.com',
    clientID: 'tOHfuMS83ZQZ5KNk1ENI4RK2PWYVUgAw',
    redirectUri: 'https://giftrit-app.herokuapp.com/callback',
    // redirectUri: 'http://localhost:3000/callback',
    audience: 'https://innt.eu.auth0.com/api/v2/',
    responseType: 'token id_token',
    scope: 'openid'
  });


  constructor() {
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  handleAuthentication() {
  this.auth0.parseHash((err, authResult) => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      this.setSession(authResult);
      window.app.Router.redirectTo('/');
    } else if (err) {
      window.app.Router.redirectTo('/');
      console.log(err);
    }
  });
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    window.app.Router.redirectTo('/');
  }

  setSession(authResult) {
    console.log("Payload: "+authResult.idTokenPayload.sub);
    window.app.me.sessionId=authResult.idTokenPayload.sub;
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    window.app.me.access_token = authResult.accessToken;
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    window.app.Router.redirectTo('/');
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
