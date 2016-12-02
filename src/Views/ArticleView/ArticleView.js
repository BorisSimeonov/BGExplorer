import React from 'react';

import './ArticleView.css';

import appStore from '../../Stores/AppStore';

export default class ArticleView extends React.Component {
    constructor() {
        super();
        this.state = appStore.getSelectedArticleData();
    }

    componentWillMount() {
        appStore.on('articleChange', this.getSelectedArticleFromStore);
    }

    componentWillUnmount() {
        //prevents memory leaks by unbinding the event listener
        appStore.removeListener('articleChange', this.getSelectedArticleFromStore);
    }

    getSelectedArticleFromStore() {
        this.setState(appStore.getSelectedArticleData());
    }

    render() {
        console.log(appStore.articlesData);
        let selectedArticle = this.state.selectedArticle;
        let selectedArticleImages = this.state.selectedArticleImages;
        if (selectedArticle) {
            console.log(selectedArticle);
            return (
                <div className="article-view-container">
                    <h1>{selectedArticle.title}</h1>
                    <img className="lead-article-image"
                         src={(selectedArticleImages.lead) ? selectedArticleImages.lead._downloadURL : null}
                         alt="Not found." />
                    <p className="article-description">{selectedArticle.description}</p>
                    <p className="article-body">{selectedArticle.text}</p>
                    <div className="article-button-holder">
                        <button>Article Gallery</button>
                        <button>Comments</button>
                    </div>
                    <div className="article-gallery-section"></div>
                    <div className="article-comments-section"></div>
                </div>
            )
        } else {
            return (
                <div>No article selected</div>
            )
        }

    }
}
