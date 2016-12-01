import dispatcher from '../Dispatcher/Dispatcher';
import kinveyAjaxRequester from '../Model/AjaxRequester';
import { hashHistory } from 'react-router';

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

        hashHistory.push('/locations');
    }
}

export function logoutUser() {
    dispatcher.dispatch({
        type: "LOGOUT_USER"
    });

    hashHistory.push('/home');
}