import React from 'react';

export default class FeedbackView extends React.Component {
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