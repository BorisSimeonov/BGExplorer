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
        })
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

    function getKinveyAuthHeaders() {
        return {
            Authorization: 'Kinvey ' + sessionStorage.getItem('authToken')
        };
    }

    return {
        loginUser,
        logoutUser,
        registerUser,
        getMountainLocations,
        getMunicipalityLocations,
        getArticlesByLocationId
    }
})();

export default KinveyAjaxRequester;