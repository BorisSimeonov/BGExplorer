import { EventEmitter } from 'events';

import dispatcher from '../Dispatcher/Dispatcher';

class AppStore extends EventEmitter {
    constructor() {
        super();
        this.userData = {
            username: sessionStorage.getItem('username'),
            userId: sessionStorage.getItem('userId')
        };
        this.articlesData = {
            loadedLocations: [],
            loadedArticles: [],
            selectedArticle: null,
            selectedArticleImages: {lead: null, trailing: []},
            selectedArticleComments: null
        };
        this.websiteFeedback = {
            loadedFeedbackMessages:[]
        }
    }

    getDefaultArticleData() {
        return {
            loadedLocations: [],
            loadedArticles: [],
            selectedArticle: null,
            selectedArticleImages: {lead: null, trailing: []},
            selectedArticleComments: null
        }
    }

    getUserInfo() {
        return this.userData;
    }

    getArticlesData() {
        return this.articlesData;
    }

    getSelectedArticleData() {
        return {
            selectedArticle: this.articlesData.selectedArticle,
            selectedArticleImages: this.articlesData.selectedArticleImages,
            selectedArticleComments: this.articlesData.selectedArticleComments
        };
    }

    getWebsiteFeedback(){
        return this.websiteFeedback;
    }

    changeLocations(loadedLocations) {
        this.articlesData = this.getDefaultArticleData();
        this.articlesData.loadedLocations = loadedLocations;

        this.emit('articleChange');
    }

    changeArticles(loadedArticles) {
        this.articlesData.loadedArticles = loadedArticles;
        this.articlesData.selectedArticle = null;
        this.articlesData.selectedArticleComments = null;

        this.emit('articleChange');
    }

    changeSelectedArticle(selectedArticle, leadingImageURL, trailingImageURLs) {
        this.articlesData.selectedArticle = selectedArticle;
        this.articlesData.selectedArticleImages.lead = leadingImageURL;
        this.articlesData.selectedArticleImages.trailing = trailingImageURLs;
        this.articlesData.selectedArticleComments = null;

        this.emit('articleChange');
    }

    changeUser(username, userId) {
        this.userData.username = username;
        this.userData.userId = userId;
        this.articlesData = this.getDefaultArticleData();

        this.emit('userChange');
    }

    changeSelectedArticleFeedback(commentsArray) {
        commentsArray = commentsArray.sort((a,b) => {
            let aTimestamp = Number(a.comment.timestamp),
                bTimestamp = Number(b.comment.timestamp);
            return bTimestamp - aTimestamp;
        });

        if(commentsArray) {
            this.articlesData.selectedArticleComments =
                commentsArray;

            this.emit('articleChange');
        }
    }

    // changeWebsiteFeedback(feedbackMessagesArray) {
    //     feedbackMessagesArray = feedbackMessagesArray.sort((a,b) => {
    //         let aTimestamp = Number(a.comment.timestamp),
    //             bTimestamp = Number(b.comment.timestamp);
    //         return bTimestamp - aTimestamp;
    //     });
    //
    //     if(feedbackMessagesArray) {
    //         this.websiteFeedback.loadedFeedbackMessages =
    //             feedbackMessagesArray;
    //
    //         this.emit('feedbackChange');
    //     }
    // }

    handleActions(action) {
        //console.log('AppStore action.', action); //For testing and debugging
        switch(action.type) {
            case 'LOGIN_USER':
                this.changeUser(action.username, action.userId);
                break;
            case 'LOGOUT_USER':
                sessionStorage.clear();
                this.changeUser(null, null);
                break;
            case 'LOCATIONS_CHANGE':
                this.changeLocations(action.loadedLocations);
                break;
            case 'ARTICLES_CHANGE':
                this.changeArticles(action.loadedArticles);
                break;
            case 'ARTICLE_LOADED':
                this.changeSelectedArticle(
                    action.selectedArticle[0],
                    action.leadingImageURL[0],
                    action.trailingImageURLs
                );
                break;
            case 'ARTICLE_FEEDBACK_LOADED':
                this.changeSelectedArticleFeedback(action.commentsArray);
                break;
            // case 'WEBSITE_FEEDBACK_LOADED':
            //     this.changeSelectedArticleFeedback(action.feedbackMessagesArray);
            //     break;
            case 'ARTICLE_COMMENT_POSTED':
                console.log('store:','Success');
                break;
            default:
                break;
        }
    }
}

const appStore = new AppStore();

dispatcher.register(appStore.handleActions.bind(appStore));

/*
//For in-browser testing
window.dispatcher = dispatcher;
window.appStore = appStore;*/

export default appStore;