import React from 'react';

import './LoggedUser.css';

export default class LoggedUser extends React.Component {
    render() {
        let username = this.props.username;
        if(!username) {
            return (
                <span className="logged-text">* Please log in or register new explorer.</span>
            )
        } else {
            return (
                <span className="logged-text">Welcome, <span className="logged-name">{username}</span>.</span>
            )
        }
    }
}
