import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import app from 'ampersand-app';
import Router from './router';
import Me from './models/me';

window.app = app;

app.extend({
  init() {
    this.me = new Me();
    this.me.fetchInitialData()
    this.Router = new Router();
    this.Router.history.start();
  }
})

app.init()

// ReactDOM.render(<App />, document.getElementById('content'));
registerServiceWorker();
