import dispatcher from '../Dispatcher/Dispatcher';
import kinveyAjaxRequester from '../Model/AjaxRequester';
import App from '../App';
import {browserHistory} from 'react-router';

export function loginUser(username, password) {
    kinveyAjaxRequester.loginUser(
        username,
        password
    )
        .then(loginSuccess);

    function loginSuccess(loggedUser) {
        sessionStorage.setItem('username', loggedUser.username);
        sessionStorage.setItem('userId', loggedUser._id);
        sessionStorage.setItem('authToken', loggedUser._kmd.authtoken);

        dispatcher.dispatch({
            type: "LOGIN_USER",
            username: loggedUser.username,
            userId: loggedUser._id
        });
        App.showInfo(`${loggedUser.username} has logged in.`);
        browserHistory.push('/locations');
    }
}

export function logoutUser() {
    kinveyAjaxRequester.logoutUser()
        .then(logoutSuccess);

    function logoutSuccess() {
        dispatcher.dispatch({
            type: "LOGOUT_USER"
        });
        sessionStorage.clear();
        App.showInfo('Explorer logged out.');
        browserHistory.push('/home');
    }
}

export function registerUser(username, password) {
    kinveyAjaxRequester.registerUser(username, password)
        .then(registrationSuccess);

    function registrationSuccess() {
        App.showInfo('New explorer has been registered.');
        browserHistory.push('/login');
    }
}

export function requestMountainNames() {
    kinveyAjaxRequester.getMountainLocations()
        .then(requestSuccess);

    function requestSuccess(mountainLocationNames) {
        let length = mountainLocationNames.length;
        if (length) {
            dispatcher.dispatch({
                type: 'LOCATIONS_CHANGE',
                loadedLocations: mountainLocationNames
            });
            App.showInfo(`${length} new location/s loaded.`);
        } else {
            App.showInfo(`No location found.`);
        }
    }
}

export function requestMunicipalityNames() {
    kinveyAjaxRequester.getMunicipalityLocations()
        .then(requestSuccess);

    function requestSuccess(mountainLocationNames) {
        let length = mountainLocationNames.length;
        if (length) {
            dispatcher.dispatch({
                type: 'LOCATIONS_CHANGE',
                loadedLocations: mountainLocationNames
            });
            App.showInfo(`${length} new location/s loaded.`);
        } else {
            App.showInfo(`No location found.`);
        }
    }
}

export function requestArticlesByLocationId(locationId) {
    kinveyAjaxRequester.getArticlesByLocationId(locationId)
        .then(requestSuccess);
    function requestSuccess(articlesArray) {
        let length = articlesArray.length;
        if (length) {
            dispatcher.dispatch({
                type: 'ARTICLES_CHANGE',
                loadedArticles: articlesArray
            });
            App.showInfo(`Success: ${length} articles found.`);
        } else {
            App.showInfo(`No articles found for this location.`);
        }
    }
}

export function requestArticleByArticleId(articleId) {
    Promise.all([
        kinveyAjaxRequester.getArticleByArticleId(articleId),
        kinveyAjaxRequester.getLeadingImagesByArticleId(articleId),
        kinveyAjaxRequester.getTrailingImagesByArticleId(articleId)
    ]).then(requestSuccess);

    function requestSuccess([articleObject, leadingImageURL, trailingImageURLs]) {
        App.showInfo('Article loaded.');
        dispatcher.dispatch({
            type: 'ARTICLE_LOADED',
            selectedArticle: articleObject,
            leadingImageURL,
            trailingImageURLs
        });
        browserHistory.push('article');
    }
}

export function requestArticleFeedback(articleId) {
    kinveyAjaxRequester.getArticleFeedbackById(articleId)
        .then(requestSuccess);

    function requestSuccess(commentsArray) {
        dispatcher.dispatch({
            type: "ARTICLE_FEEDBACK_LOADED",
            commentsArray
        });
    }
}

export function requestFeedbackMessages() {
    kinveyAjaxRequester.requestRefreshFeedbackMessages()
        .then(requestSuccess);

    function requestSuccess(feedbackMessagesArray) {
        dispatcher.dispatch({
            type: "WEBSITE_FEEDBACK_LOADED",
            feedbackMessagesArray
        });
    }
}

export function requestArticlesByTitleSubstring(titleSubstring) {
    kinveyAjaxRequester.requestArticleNamesContainingSubstring(titleSubstring)
        .then(requestSuccess);

    function requestSuccess(articles) {
        dispatcher.dispatch({
            type: 'NEW_SEARCH_RESULT',
            results: articles
        });
    }
}

export function requestSearchRoute() {
    browserHistory.push('search');
}

export function postNewArticleFeedback(
    articleId, commentText, authorName, timestamp) {
    let commentObject = {
        article_id: articleId,
        comment: {
            text: commentText,
            from: authorName,
            timestamp
        }
    };

    kinveyAjaxRequester.postNewArticleFeedback(articleId, commentObject)
        .then(postSuccess.bind(this));

    function postSuccess() {
        App.showInfo('Comment is posted.');
        this.requestArticleFeedback(articleId);
    }
}

export function deleteArticleComment(commentId, selectedArticleId) {
    kinveyAjaxRequester.deleteArticleCommentById(commentId)
        .then(deleteSuccess.bind(this));

    function deleteSuccess() {
        App.showInfo('Comment deleted.');
        this.requestArticleFeedback(selectedArticleId);
    }
}