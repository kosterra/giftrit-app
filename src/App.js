import React, { Component } from 'react';
import './App.css';
import SimpleCounter from './components/SimpleCounter';

class App extends Component {
    render() {
        return (
            <div>
                <p>Hello world!</p>
                <SimpleCounter />
            </div>
        );
    }
}

export default App;
