import React from 'react';
import $ from 'jquery';

import './ArticleView.css';

import ArticleCommentView from '../ArticleCommentView/ArticleCommentView';
import ArticleGalleryView from '../ArticleGalleryView/ArticleGalleryView';
import appStore from '../../Stores/AppStore';
import * as componentActions from '../../Actions/componentActions';

export default class ArticleView extends React.Component {
    constructor() {
        super();
        this.state = appStore.getSelectedArticleData();
        this.getSelectedArticleFromStore =
            this.getSelectedArticleFromStore.bind(this);
    }

    componentWillMount() {
        appStore.on('articleChange', this.getSelectedArticleFromStore);
    }

    componentWillUnmount() {
        //prevents memory leaks by unbinding the event listener
        appStore.removeListener('articleChange', this.getSelectedArticleFromStore);
    }

    getSelectedArticleFromStore() {
        let newArticleState = appStore.getSelectedArticleData();
        this.setState(newArticleState);
    }

    render() {
        let selectedArticle = this.state.selectedArticle;
        let selectedArticleImages = this.state.selectedArticleImages;
        let selectedArticleComments = this.state.selectedArticleComments;

        if (selectedArticle) {
            return (
                <div className="article-view-container">
                    <h1>{selectedArticle.title}</h1>
                    <img className="lead-article-image"
                         src={(selectedArticleImages.lead) ? selectedArticleImages.lead._downloadURL : null}
                         alt="Not found."/>
                    <p className="article-description">{selectedArticle.description}</p>
                    <p className="article-body">{selectedArticle.text}</p>
                    <div className="article-button-holder">
                        <button className="article-left-button"
                                onClick={ArticleView.handleShowHideClicked.bind(this, '#article-gallery-section')}>
                            <span>Show</span> Gallery
                        </button>
                        <button className="article-right-button"
                                onClick={ArticleView.requestArticleFeedback.bind(this, '#article-comments-section')}>
                            <span>Show</span> Comments
                        </button>
                    </div>
                    <div id="article-gallery-section">
                        <ArticleGalleryView imageObjectsList={this.state.selectedArticleImages.trailing}/>
                    </div>
                    <div id="article-comments-section">
                        <ArticleCommentView commentsArray={selectedArticleComments}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div>No article selected</div>
            )
        }
    }

    static requestArticleFeedback(targetSelector) {
        let selectedArticle = appStore.articlesData.selectedArticle;
        if(selectedArticle && appStore.articlesData.selectedArticleComments === null) {
            componentActions.requestArticleFeedback(selectedArticle._id);
        }

        ArticleView.handleShowHideClicked(targetSelector);
    }

    static handleShowHideClicked(targetSelector) {
        $(targetSelector).toggle();
    }
}
