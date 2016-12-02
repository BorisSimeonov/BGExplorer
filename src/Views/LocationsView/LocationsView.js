import React from 'react';

import KinveyAjaxRequester from '../../Model/AjaxRequester';
import $ from 'jquery';

import './LocationsView.css'

export default class LocationsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            articles: []
        };
    }

    componentDidMount() {
        $('.locations-select').on('change', this.requestArticles.bind(this))
    }

    render() {
        let natureIcon = <img alt="Section:" src={require('../../Resources/Images/nature.png')}/>;
        let villagesIcon = <img alt="Section:" src={require('../../Resources/Images/villages.png')}/>;

        if (sessionStorage.getItem('authToken')) {
            let options = this.state.options.map(item =>
                <option className="location-option" key={item._id} value={item._id}>{item.locationName}</option>);
            let articles = this.state.articles.map(item =>
                <option key={item._id} value={item._id}>{item.title}</option>);

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
                        <select className="locations-select">
                            <option selected disabled="disabled">Choose exact location.</option>
                            {options}
                        </select>
                    </div>
                    <div id="article">
                        <select className="article-select">
                            <option selected disabled="disabled">Choose exact location.</option>
                            {articles}
                        </select>
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
        switch(type) {
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
            this.setState({options: locationsArray});
        }
    }

    requestArticles() {
        let selectedLocationId = $('.location-option:selected').val();

        KinveyAjaxRequester.getArticlesByLocationId(selectedLocationId)
            .then(articlesRequestSuccess.bind(this));

        function articlesRequestSuccess(articlesList) {
            this.setState({articles: articlesList});
        }
    }
}
