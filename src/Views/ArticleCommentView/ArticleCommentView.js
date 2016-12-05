import React from 'react';
import $ from 'jquery';

import './ArticleCommentsView.css';

import appStore from '../../Stores/AppStore';
import * as componentAcions from '../../Actions/componentActions';

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
                                    <input type="button" onClick={ArticleCommentView
                                        .deleteArticleComment.bind(this, commentObj)}
                                           value="Delete"/> : null
                            }</span>
                        </h3>
                        <div className="article-comment-time">{
                            <span>
                                {
                                    new Date(Number(commentObj.comment.timestamp)).toString()
                                }
                            </span>
                        }</div>
                        <div className="article-comment-text">{commentObj.comment.text}</div>

                    </div>
                )
            );
        }

        if (sessionStorage.getItem('authToken')) {
            return (
                <form className="article-feedback-holder">
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
                    {commentsArray}
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
        let newCommentText = textArea.val().trim().replace(/\s+/g, ' ');

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

    static deleteArticleComment(commentObject) {
        componentAcions.deleteArticleComment(
            commentObject._id, commentObject.article_id);
    }
}
