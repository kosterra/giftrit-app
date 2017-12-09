import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';

class App extends Component {
    constructor() {
        super();
        this.state = { items: [] };
    }

    componentDidMount() {
        var that = this;
        var url = `https://giftrit-service.herokuapp.com/api/helloworld`;

        fetch(url)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                that.setState({ items: data.rows });
            });
    }

    render() {
        return (
            <div className="app">
                <Header />

                <div>Frontpage: Describe what we do.</div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <Footer />
            </div>
        );
    }
}

export default App;
