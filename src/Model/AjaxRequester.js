import $ from 'jquery';

let KinveyAjaxRequester = (function () {
    const app_key = 'kid_HJiZXC6bx',
        app_secret = 'd3b201a1b3e3409da84387d054e2d23a',
        base_url = 'https://baas.kinvey.com/',
        authHeaders = {
            'Authorization': 'Basic ' +
            btoa(`${app_key}:${app_secret}`)
        };

    let registerUser = function (username, password) {
        return $.ajax({
            method: 'POST',
            url: base_url + 'user/' + app_key + '/',
            headers: authHeaders,
            data: JSON.stringify({username, password}),
            contentType: 'application/json'
        })
    };

    let loginUser = function (username, password) {
        return $.ajax({
            method: 'POST',
            url: base_url + 'user/' +
            app_key + '/login',
            headers: authHeaders,
            data: JSON.stringify({username, password}),
            contentType: 'application/json'
        });
    };

    let logoutUser = function () {
        return $.ajax({
            method: 'POST',
            url: base_url + 'user/' +
            app_key + '/_logout',
            headers: getKinveyAuthHeaders()
        });
    };

    let getMountainLocations = function () {
        return $.ajax({
            method: 'GET',
            url: base_url + 'appdata/' +
            app_key + '/locations',
            headers: getKinveyAuthHeaders()
        });
    };

    let getMunicipalityLocations = function () {
        return $.ajax({
            method: 'GET',
            url: base_url + 'appdata/' +
            app_key + '/municipality',
            headers: getKinveyAuthHeaders()
        })
    };

    let getArticlesByLocationId = function (locationId) {
        return $.ajax({
            method: 'GET',
            url: base_url + 'appdata/' +
            app_key + "/articles?query=" +
            JSON.stringify({location_id: locationId}),
            headers: getKinveyAuthHeaders()
        })
    };

    let getArticleByArticleId = function (articleId) {
        return $.ajax({
            method: 'GET',
            url: base_url + 'appdata/' + app_key +
            '/articles-data?query=' + JSON.stringify({article_id: articleId}),
            headers: getKinveyAuthHeaders()
        });
    };

    let getLeadingImagesByArticleId = function (articleId) {
        return $.ajax({
            method: 'GET',
            url: base_url + 'blob/' + app_key +
            '?query=' + JSON.stringify({article_id: articleId, type: "lead"}),
            headers: getKinveyAuthHeaders()
        });
    };

    let getTrailingImagesByArticleId = function (articleId) {
        return $.ajax({
            method: 'GET',
            url: base_url + 'blob/' + app_key +
            '?query=' + JSON.stringify({article_id: articleId, type: "trail"}),
            headers: getKinveyAuthHeaders()
        });
    };

    let getArticleFeedbackById = function (articleId) {
        return $.ajax({
            method: 'GET',
            url: base_url + 'appdata/' + app_key +
            '/articles-feedback?query=' + JSON.stringify({'article_id':articleId}),
            headers: getKinveyAuthHeaders()
        });
    };
    
    let postNewArticleFeedback = function (articleId, commentObject) {
        return $.ajax({
            method: 'POST',
            url: base_url + 'appdata/' + app_key +
                '/articles-feedback',
            headers: getKinveyAuthHeaders(),
            data: JSON.stringify(commentObject), //{from:...,timestamp:....,text:....};
            contentType: 'application/json'
        })
    };

    let deleteArticleCommentById = function (commentId) {
      return $.ajax({
          method: 'DELETE',
          url: base_url + 'appdata/' + app_key +
              '/articles-feedback/' + commentId,
          headers: getKinveyAuthHeaders()
      })
    };

    function getKinveyAuthHeaders() {
        return {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };
    }

    let requestArticleNamesContainingSubstring = function (nameSubstring) {
        return $.ajax({
            method: 'GET',
            url: base_url + 'appdata/' + app_key +
            '/articles?query=' + JSON.stringify(
                {
                    $or: [
                        {title: {$regex: '^.*' + nameSubstring.toLowerCase() + '.*'}},
                        {title: {$regex: '^.*' + nameSubstring.toUpperCase() + '.*'}},
                        {title: {$regex: '^.*' + nameSubstring + '.*'}}
                    ]
                }
            ),
            headers: getKinveyAuthHeaders()
        });
    };

    let requestRefreshFeedbackMessages = function () {
        return $.ajax({
            method: 'GET',
            url: base_url + 'appdata/' +
            app_key + '/user-feedback',
            headers: getKinveyAuthHeaders()
        });
    };

    let sendFeedbackRequest = function (feedback_text,user_name,timestamp) {
        return $.ajax({
            method: 'POST',
            url: base_url + 'appdata/' +
            app_key + '/user-feedback',
            headers: getKinveyAuthHeaders(),
            data: JSON.stringify({
                user_id:sessionStorage.getItem('userId'),
                user_name:user_name,
                feedback_text:feedback_text,
                timestamp:timestamp
            }),
            contentType: 'application/json'
        });
    };

    let deleteFeedbackById = function (feedbackId) {
        return $.ajax({
            method: 'DELETE',
            url: base_url + 'appdata/' + app_key +
            '/user-feedback/' + feedbackId,
            headers: getKinveyAuthHeaders()
        })
    };

    return {
        loginUser,
        logoutUser,
        registerUser,
        getMountainLocations,
        getMunicipalityLocations,
        getArticlesByLocationId,
        getArticleByArticleId,
        getLeadingImagesByArticleId,
        getTrailingImagesByArticleId,
        getArticleFeedbackById,
        postNewArticleFeedback,
        deleteArticleCommentById,
        requestRefreshFeedbackMessages,
        requestArticleNamesContainingSubstring,
        sendFeedbackRequest,
        deleteFeedbackById
    }
})();

export default KinveyAjaxRequester;