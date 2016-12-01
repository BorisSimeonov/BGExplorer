import React from 'react';

import './App.css';
import appStore from './Stores/AppStore';

import Header from './Components/Header/Header';
import Navigation from './Components/Navigation/Navigation';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = appStore.getUserInfo();
    }

    componentWillMount() {
        appStore.on('userChange', () => {
            let newState  = appStore.getUserInfo();
            this.setState({
                username: newState.username,
                userId: newState.userId
            });
        })
    }

    render() {
        const { username } = this.state;
        return (
            <div className="App">
                <Header username={username}/>
                <Navigation username={username}/>
                {this.props.children}
            </div>
        );
    }

}
