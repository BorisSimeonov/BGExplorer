import React from 'react';

import './ArticleCommentsView.css';
import appStore from '../../Stores/AppStore';

//TODO: implement add comment logic and delete comments functionality for the posts
//TODO: implement sorting logic for comments before rendering on page

export default class ArticleCommentView extends React.Component {
    render() {
        let commentsArray = this.props.commentsArray;
        if (commentsArray && commentsArray.length) {
            commentsArray = commentsArray.map(commentObj =>
                (<div key={commentObj._id} className="article-feedback-post">
                    <h3><span className="article-comment-owner-name">{commentObj.comment.from}</span>
                        <span
                            className="article-comment-delete">{
                            (commentObj._acl.creator === appStore.userData.userId) ?
                                <button>Delete</button> : null
                        }</span>
                    </h3>
                    <div className="article-comment-text">{commentObj.comment.text}</div>
                </div>)
            );
        }

        if (sessionStorage.getItem('authToken')) {
            return (
                <div className="article-feedback-holder">
                    {commentsArray}
                </div>
            )
        } else {
            return (
                <p>Please login first.</p>
            )
        }

    }
}
