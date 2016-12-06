import React from 'react';
import $ from 'jquery';

import './SearchView.css';

import appStore from '../../Stores/AppStore';
import * as componentActions from '../../Actions/componentActions';

export default class SearchView extends React.Component {
    constructor() {
        super();
        this.setNewSearchResult = this.setNewSearchResult.bind(this);
        this.state = appStore.currentSearchResult;
    }

    componentWillMount() {
        appStore.on('searchResultChange', this.setNewSearchResult);
    }

    setNewSearchResult() {
        this.setState(appStore.currentSearchResult)
    }

    componentWillUnmount() {
        appStore.removeListener('searchResultChange', this.setNewSearchResult);
        appStore.resetAppStoreSearchResultState();
    }

    render() {
        let foundResults = null;
        if (this.state.results) {
            foundResults = this.state.results.map(foundArticle => (
                <li key={foundArticle._id} onClick={
                    SearchView.requestSelectedArticleById.bind(this, foundArticle._id)
                }>
                    {foundArticle.title}
                </li>
            ));
        }

        return (
            <div className="article-search-holder">
                <h3>Search for article by article name</h3>
                <input id="article-search-input" type="text" width="80%"
                       onChange={
                           SearchView.makeRejexKinveyRequest.bind(this)
                       }
                />
                <ul id="search-found-articles-ul">
                    {foundResults}
                </ul>
            </div>
        )
    }

    static makeRejexKinveyRequest() {
        let input = $('#article-search-input');
        let enteredText = input.val();
        if (enteredText) {
            componentActions.requestArticlesByTitleSubstring(enteredText)
        }
    }

    static requestSelectedArticleById(articleId) {
        componentActions.requestArticleByArticleId(articleId);
    }
}
