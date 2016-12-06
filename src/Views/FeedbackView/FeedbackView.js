import React from 'react';
import $ from 'jquery';

import './FeedbackView.css';

import appStore from '../../Stores/AppStore';
import * as componentAcions from '../../Actions/componentActions';

export default class FeedbackView extends React.Component {
    constructor() {
        super();
        this.state = appStore.getWebsiteFeedback();
        this.getFeedbackMessages =
            this.getFeedbackMessages.bind(this);

    }

    componentWillMount() {
        appStore.on('feedbackChange', this.getFeedbackMessages);
    }

    componentWillUnmount() {
        //prevents memory leaks by unbinding the event listener
        appStore.removeListener('feedbackChange', this.getFeedbackMessages);
    }

    getFeedbackMessages() {
        let newFeedbackState = appStore.getWebsiteFeedback();
        this.setState(newFeedbackState);
    }
    render() {
        let feedbackMessagesArray = this.state.loadedFeedbackMessages;
        if (feedbackMessagesArray && feedbackMessagesArray.length) {
            feedbackMessagesArray = feedbackMessagesArray.map(feedbackObj =>
                (<div key={feedbackObj._id} className="feedback-post">
                        <h3><span className="feedback-owner-name">{feedbackObj.user_name}</span>
                            <span
                                className="feedback-delete">{
                                (feedbackObj._acl.creator === appStore.userData.userId) ?
                                    <input type="button" onClick={FeedbackView
                                        .deleteFeedback.bind(this, feedbackObj)}
                                           value="Delete"/> : null
                            }</span>
                        </h3>
                        <div className="feedback-time">{
                            <span>
                                {
                                    new Date(Number(feedbackObj.timestamp)).toString()
                                }
                            </span>
                        }</div>
                        <div className="feedback-text">{feedbackObj.feedback_text}</div>

                    </div>
                )
            );
        }

        if (sessionStorage.getItem('authToken')) {
            return (
                <form className="feedback-holder">
                    {feedbackMessagesArray}
                    <div className="feedback-comment-composer">
                        <div>
                            <h3>Add new feedback message:</h3>
                            <span className="feedback-info-span">*Empty comments will be ignored.</span>
                            <textarea id="feedback-new-comment-area"/>
                        </div>
                        <input className="feedback-comment-button"
                               type="button" value={"Send Feedback"}
                               onClick={FeedbackView.postNewFeedback.bind(this)}/>
                        <input className="feedback-comment-button"
                               type="button" value={"Show Feedback Messages"}
                               onClick={FeedbackView.refreshFeedbackComments.bind(this)}
                        />
                    </div>
                </form>
            )
        } else {
            return (
                <p>Please login first.</p>
            )
        }
    }

    static postNewFeedback() {
        let textArea = $('#feedback-new-comment-area');
        let newFeedbackText = textArea.val().trim().replace(/\s+/g, ' ');

        if (newFeedbackText) {
            componentAcions.postNewFeedback(
                newFeedbackText,
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

    static deleteFeedback(feedbackObject) {
        componentAcions.deleteFeedback(
            feedbackObject._id);
    }

    static refreshFeedbackComments() {
        componentAcions.requestFeedbackMessages();
    }
}
