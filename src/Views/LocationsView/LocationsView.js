import React from 'react';

import* as componentActions from '../../Actions/componentActions';
import appStore from '../../Stores/AppStore';
import KinveyAjaxRequester from '../../Model/AjaxRequester';

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

        if (sessionStorage.getItem('authToken')) {
            return (
                <nav className="locations-navigation">
                    <div>
                        <a className="locations-menu-item nature"
                           onClick={this.requestLocations.bind(this, "mountain")}>
                            {natureIcon}
                        </a>
                        <a className="locations-menu-item village"
                           onClick={this.requestLocations.bind(this, "municipality")}>
                            {villagesIcon}
                        </a>
                    </div>
                    <div>
                        <ul id="locations-ul">
                            {
                                this.state.loadedLocations.map(item =>
                                    <li className="location-item" key={item._id}
                                        onClick={this.requestArticles.bind(this, item._id)}>
                                        {item.locationName}
                                    </li>)
                            }
                        </ul>
                    </div>
                    <div id="articles">
                        <ul id="articles-ul">
                            {
                                this.state.loadedArticles.map(item =>
                                    <li className="location-item" key={item._id} value={item._id}>
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

    requestLocations(type) {
        switch (type) {
            case 'mountain':
                componentActions.requestMountainNames();
                break;
            case 'municipality':
                componentActions.requestMunicipalityNames();
                break;
            default:
                break;
        }
    }

    requestArticles(articleId) {
        KinveyAjaxRequester.getArticlesByLocationId(articleId)
            .then(articlesRequestSuccess.bind(this));

        function articlesRequestSuccess(articlesList) {
            this.setState({articles: articlesList});
        }
    }
}
