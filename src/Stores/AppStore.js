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
            selectedArticle: null
        }
    }

    getUserInfo() {
        return this.userData;
    }

    getArticlesData() {
        return this.articlesData;
    }

    changeLocations(loadedLocations) {
        this.articlesData.loadedLocations = loadedLocations;
        this.emit('articleChange');
    }

    changeUser(username, userId) {
        this.userData.username = username;
        this.userData.userId = userId;

        this.emit('userChange');
    }

    handleActions(action) {
        console.log('AppStore action.', action); //For testing and debugging
        switch(action.type) {
            case 'LOGIN_USER':
                this.changeUser(action.username, action.userId);
                break;
            case 'LOGOUT_USER':
                this.changeUser(null, null);
                break;
            case 'LOCATIONS_CHANGE':
                this.changeLocations(action.loadedLocations);
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