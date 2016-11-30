import React from 'react'

import './Header.css';

import LoggedUser from './LoggedUser/LoggedUser';
import Title from './Title/Title';

export default class Header extends React.Component {
    render() {
        return (
            <header className="app-header">
                <Title />
                <LoggedUser username={this.props.username}/>
            </header>
        )
    }
}
