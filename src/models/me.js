import Model from 'ampersand-model';
// import GiftrCollection from './giftr-collection'

export default Model.extend({

  url: 'https://api.github.com/user',

  initialize() {
    this.token = window.localStorage.token;
    this.on('change:token', this.onChangeToken)
  },

  props: {
    id: 'number',
    login: 'string',
    avatar_url: 'string'
  },

  session: {
    token: 'string'
  },

  collections: {
    // giftrs: GiftrCollection
  },

  onChangeToken () {
    window.localStorage.token = this.token
    this.fetchInitialData()
  },

  fetchInitialData() {
    if(this.token) {
      this.fetch()
      // this.repos.fetch()
    }
  },
});
