import React from 'react';
import $ from 'jquery';

import* as componentActions from '../../Actions/componentActions';
import appStore from '../../Stores/AppStore';

import './LocationsView.css'

export default class LocationsView extends React.Component {
    constructor() {
        super();
        this.getArticlesFromStore = this.getArticlesFromStore.bind(this);
        this.state = appStore.getArticlesData();
    }

    componentWillMount() {
        appStore.on('articleChange', this.getArticlesFromStore);
    }

    componentWillUnmount() {
        //prevents memory leaks by unbinding the event listener
        appStore.removeListener('articleChange', this.getArticlesFromStore);
    }

    getArticlesFromStore() {
        this.setState(
            appStore.getArticlesData()
        );
    }

    render() {
        let natureIcon = <img alt="Section:" src={require('../../Resources/Images/nature.png')}/>;
        let villagesIcon = <img alt="Section:" src={require('../../Resources/Images/villages.png')}/>;
        let searchIcon = <img alt="Section:" src={require('../../Resources/Images/search.png')}/>;

        if (sessionStorage.getItem('authToken')) {
            return (
                <nav className="locations-navigation">
                    <div className="navigation-icon-holder">
                        <a className="locations-menu-item nature"
                           onClick={LocationsView.requestAllLocationsOfType.bind(this, "mountain")}>
                            {natureIcon}
                        </a>
                        <a className="locations-menu-item village"
                           onClick={LocationsView.requestAllLocationsOfType.bind(this, "municipality")}>
                            {villagesIcon}
                        </a>
                        <a className="locations-menu-item search"
                           onClick={LocationsView.requestAllLocationsOfType.bind(this, "search")}>
                            {searchIcon}
                        </a>
                    </div>
                    <div>
                        <span className="locations-label-span"
                              onClick={LocationsView.handleShowHideClicked.bind(this, '#locations-ul li')}>
                            Show/Hide Locations
                        </span>
                        <ul id="locations-ul">
                            {
                                this.state.loadedLocations.map(item =>
                                    <li className="location-item" key={item._id}
                                        onClick={LocationsView.requestArticlesByLocationId.bind(this, item._id)}>
                                        {item.locationName}
                                    </li>)
                            }
                        </ul>
                    </div>
                    <div id="articles">
                        <span className="articles-label-span"
                              onClick={LocationsView.handleShowHideClicked.bind(this, '#articles-ul li')}>
                            Show/Hide Articles
                        </span>
                        <ul id="articles-ul">
                            {
                                this.state.loadedArticles.map(item =>
                                    <li className="location-item" key={item._id}
                                        onClick={LocationsView.requestArticleById.bind(this, item._id)}>
                                        {item.title}
                                    </li>)
                            }
                        </ul>
                    </div>
                </nav>
            )
        } else {
            return (
                <p>Please login first.</p>
            )
        }
    }

    static handleShowHideClicked(targetSelector) {
        $(targetSelector).toggle();
    }

    static requestAllLocationsOfType(type) {
        switch (type) {
            case 'mountain':
                componentActions.requestMountainNames();
                break;
            case 'municipality':
                componentActions.requestMunicipalityNames();
                break;
            case 'search':
                componentActions.requestSearchRoute();
                break;
            default:
                break;
        }
    }

    static requestArticlesByLocationId(articleId) {
        componentActions.requestArticlesByLocationId(articleId);
    }

    static requestArticleById(articleId) {
        componentActions.requestArticleByArticleId(articleId);
    }
}
