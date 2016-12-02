import dispatcher from '../Dispatcher/Dispatcher';
import kinveyAjaxRequester from '../Model/AjaxRequester';
import App from '../App';
import {hashHistory} from 'react-router';

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
        hashHistory.push('/locations');
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
        hashHistory.push('/home');
    }
}

export function registerUser(username, password) {
    kinveyAjaxRequester.registerUser(username, password)
        .then(registrationSuccess);

    function registrationSuccess() {
        App.showInfo('New explorer has been registered.');
        hashHistory.push('/login');
    }
}

export function requestMountainArticleNames() {
    //TODO: implement flux patter for article requesting and visualization
    // /kinveyAjaxRequester.getMountainLocations()
}