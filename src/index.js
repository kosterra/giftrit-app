import './index.css';
import registerServiceWorker from './registerServiceWorker';
import app from 'ampersand-app';
import Router from './router';
import Me from './models/me';
import Auth from './helpers/auth/auth';

window.app = app;

app.extend({
  init() {
    this.auth = new Auth();
    this.me = new Me();
    this.me.fetchInitialData()
    this.Router = new Router();
    this.Router.history.start();
  }
})

app.init()

registerServiceWorker();
