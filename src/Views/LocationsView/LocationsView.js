import React from 'react';

export default class LocationsView extends React.Component {
    render() {
        if (sessionStorage.getItem('authToken')) {
            return (
                <p>Feedback view</p>
            )
        } else {
            return (
                <p>Please login first.</p>
            )
        }
    }
}
