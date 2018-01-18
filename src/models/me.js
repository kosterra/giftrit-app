import Model from 'ampersand-model';
// import GiftrCollection from './giftr-collection'

export default Model.extend({

  url: 'https://giftrit-service.herokuapp.com/api/users',

  ajaxConfig () {
    return {
      headers: {
        'Authorization': 'Bearer ' + this.access_token
      }
    }
  },

  initialize() {
    this.access_token = window.localStorage.access_token || ""
    this.authid_token = window.localStorage.authid_token || ""
    this.expires_at = JSON.stringify(window.localStorage.expires_at) || JSON.stringify("")

    this.on('change:access_token', this.onChangeToken)
  },

  props: {
    id: 'number',
    firstname: 'string',
    lastname: 'string',
    phone: 'string',
    email: 'string',
    username: 'string',
    statusId: 'number',
    karma: 'number',
    description: 'string',
    imageUrl: 'string',
    authId : 'string',
    sessionId : 'string'
  },

  session: {
    access_token: 'string',
    authid_token: 'string',
    expires_at: 'string'
  },

  collections: {
    // giftrs: GiftrCollection
  },

  onChangeToken () {
    window.localStorage.access_token = this.access_token
    window.localStorage.authid_token = this.authid_token
    window.localStorage.expires_at = this.expires_at
    this.fetchInitialData()
  },

  fetchInitialData() {
    if(this.access_token) {
      this.fetch()
      // this.repos.fetch()
    }
  },
});
