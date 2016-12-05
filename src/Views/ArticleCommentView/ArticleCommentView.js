import React from 'react';
import $ from 'jquery';

import './ArticleCommentsView.css';

import appStore from '../../Stores/AppStore';
import * as componentAcions from '../../Actions/componentActions';

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
                                    <button onClick={ArticleCommentView.deleteArticleComment.bind(this)}>
                                        Delete
                                    </button> : null
                            }</span>
                        </h3>
                        <div className="article-comment-text">{commentObj.comment.text}</div>

                    </div>
                )
            );
        }

        if (sessionStorage.getItem('authToken')) {
            return (
                <form className="article-feedback-holder">
                    {commentsArray}
                    <div className="article-comment-composer">
                        <div>
                            <h3>Add new comment:</h3>
                            <span className="comments-info-span">*Empty comments will be ignored.</span>
                            <textarea id="article-new-comment-area"/>
                        </div>
                        <input className="article-comment-button"
                               type="button" value={"Post Comment"}
                               onClick={ArticleCommentView.postNewComment.bind(this)}/>
                        <input className="article-comment-button" type="button" value={"Refresh Comments"}/>
                    </div>
                </form>
            )
        } else {
            return (
                <p>Please login first.</p>
            )
        }
    }

    static postNewComment() {
        let textArea = $('#article-new-comment-area');
        let newCommentText = textArea.val();

        if (newCommentText) {
            componentAcions.postNewArticleFeedback(
                appStore.articlesData.selectedArticle.article_id,
                newCommentText,
                appStore.userData.username,
                Date.now()
            );
            textArea.val('');
        } else {
            let infoSpan = $('.comments-info-span');
            if (infoSpan.css('display') === 'none') {
                infoSpan.toggle();
                setInterval(() => {
                    infoSpan.fadeOut(1000)
                }, 2000);
            }
        }
    }

    static deleteArticleComment(event) {
        event.preventDefault();
        console.log('delete');
    }
}
