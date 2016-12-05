import React from 'react';
import $ from 'jquery';

import './FeedbackView.css';

import appStore from '../../Stores/AppStore';
import * as componentAcions from '../../Actions/componentActions';

export default class FeedbackView extends React.Component {
    render() {
        let commentsArray = this.props.commentsArray;
        if (commentsArray && commentsArray.length) {
            commentsArray = commentsArray.map(commentObj =>
                (<div key={commentObj._id} className="feedback-post">
                        <h3><span className="feedback-owner-name">{commentObj.comment.from}</span>
                            <span
                                className="feedback-delete">{
                                (commentObj._acl.creator === appStore.userData.userId) ?
                                    <input type="button" onClick={FeedbackView
                                        .deleteArticleComment.bind(this, commentObj)}
                                           value="Delete"/> : null
                            }</span>
                        </h3>
                        <div className="feedback-time">{
                            <span>
                                {
                                    new Date(Number(commentObj.comment.timestamp)).toString()
                                }
                            </span>
                        }</div>
                        <div className="feedback-text">{commentObj.comment.text}</div>

                    </div>
                )
            );
        }

        if (sessionStorage.getItem('authToken')) {
            return (
                <form className="feedback-holder">
                    <div className="feedback-comment-composer">
                        <div>
                            <h3>Add new feedback message:</h3>
                            <span className="feedback-info-span">*Empty comments will be ignored.</span>
                            <textarea id="feedback-new-comment-area"/>
                        </div>
                        <input className="feedback-comment-button"
                               type="button" value={"Send Feedback"}
                               onClick={FeedbackView.postNewComment.bind(this)}/>
                        <input className="feedback-comment-button"
                               type="button" value={"Refresh Feedback"}
                               onClick={FeedbackView.refreshArticleComments.bind(this)}
                        />
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
        let textArea = $('#feedback-new-comment-area');
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
            let infoSpan = $('.feedback-info-span');
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

    static refreshArticleComments() {
        let currentArticleId = appStore.articlesData.selectedArticle._id;
        componentAcions.requestArticleFeedback(currentArticleId);
    }
}
