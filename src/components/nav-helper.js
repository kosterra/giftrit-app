import app from 'ampersand-app';
import React from 'react';
import localLinks from 'local-links'

export default class NavHelper extends React.Component {

  onClick (event) {
    const pathname = localLinks.getLocalPathname(event)
    if (pathname) {
      event.preventDefault();
      app.Router.history.navigate(pathname);
    }
  }

  render () {
      return (
        <div {...this.props} onClick={this.onClick}>
          {this.props.children}
        </div>
      )
  }
}
