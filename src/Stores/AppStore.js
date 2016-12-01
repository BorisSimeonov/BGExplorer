import { EventEmitter } from 'events';

import dispatcher from '../Dispatcher/Dispatcher';

class AppStore extends EventEmitter {
    constructor() {
        super();
        this.userData = {
            "username": sessionStorage.getItem('username'),
            "userId": sessionStorage.getItem('userId')
        };
    }

    getUserInfo() {
        return this.userData;
    }

    changeUser(username, userId) {
        this.userData.username = username;
        this.userData.userId = userId;

        this.emit('userChange');
    }

    handleActions(action) {
        console.log('AppStore action.', action);
        switch(action.type) {
            case 'LOGIN_USER':
                this.changeUser(action.username, action.userId);
                break;
            case 'LOGOUT_USER':
                this.changeUser(null, null);
                break;
            default:
                break;
        }
    }
}

const appStore = new AppStore();

dispatcher.register(appStore.handleActions.bind(appStore));

window.dispatcher = dispatcher;

window.appStore = appStore;

export default appStore;