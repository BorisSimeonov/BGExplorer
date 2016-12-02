import React from 'react';

export default class ArticleCommentView extends React.Component {
    render() {
        if (sessionStorage.getItem('authToken')) {
            return (
                <p>Article comment view</p>
            )
        } else {
            return (
                <p>Please login first.</p>
            )
        }

    }
}
