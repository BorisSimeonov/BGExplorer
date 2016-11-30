import React from 'react';
import { Link } from 'react-router';

import './Navigation.css';

export default class Navigation extends React.Component {
    render() {
        if (!this.props.username) {
            return (
                <div className="navigation-bar">
                    <Link to="/home">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            )
        } else {
            return (
                <div className="navigation-bar">
                    <Link to="/home">Home</Link>
                    <Link to="/locations">Locations</Link>
                    <Link to="/feedback">Feedback</Link>
                    <a href="#">Logout</a>
                </div>
            )
        }
    }
}
