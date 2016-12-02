import React from 'react';

import KinveyAjaxRequester from '../../Model/AjaxRequester';

import './LocationsView.css'

export default class LocationsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            articles: []
        };
    }


    render() {
        let natureIcon = <img alt="Section:" src={require('../../Resources/Images/nature.png')}/>;
        let villagesIcon = <img alt="Section:" src={require('../../Resources/Images/villages.png')}/>;

        if (sessionStorage.getItem('authToken')) {
            let locations = this.state.locations.map(item =>
                <li className="location-item" key={item._id}
                    onClick={this.requestArticles.bind(this, item._id)}>
                    {item.locationName}
                </li>);
            let articles = this.state.articles.map(item =>
                <li className="location-item" key={item._id} value={item._id}>
                    {item.title}
                </li>);

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
                            {locations}
                        </ul>
                    </div>
                    <div id="articles">
                        <ul id="articles-ul">
                            {articles}
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
                KinveyAjaxRequester.getMountainLocations()
                    .then(appendResultAsOptions.bind(this));
                break;
            case 'municipality':
                KinveyAjaxRequester.getMunicipalityLocations()
                    .then(appendResultAsOptions.bind(this));
                break;
            default:
                break;
        }

        function appendResultAsOptions(locationsArray) {
            this.setState({
                locations: locationsArray,
                articles: []
            });
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
