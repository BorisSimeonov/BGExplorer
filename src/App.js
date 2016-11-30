import React from 'react';

import './App.css';

import Header from './Components/Header/Header';
import Navigation from './Components/Navigation/Navigation';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            userId: null
        }
    }

    render() {
        return (
            <div className="App">
                <Header username={this.state.username}/>
                <Navigation username={this.state.username}/>
                {this.props.children}
            </div>
        );
    }

}
