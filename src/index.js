import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import './index.css';

import ArticleCommentView from './Views/ArticleCommentView/ArticleCommentView';
import ArticleView from './Views/ArticleView/ArticleView';
import FeedbackView from './Views/FeedbackView/FeedbackView';
import HomeView from './Views/HomeView/HomeView';
import LocationsView from './Views/LocationsView/LocationsView';
import LoginView from './Views/LoginView/LoginView';
import RegisterView from './Views/RegisterView/RegisterView';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomeView}/>
            <Route path="home" component={HomeView}/>
            <Route path="login" component={LoginView}/>
            <Route path="register" component={RegisterView}/>
            <Route path="locations" component={LocationsView}/>
            <Route path="feedback" component={FeedbackView}/>
            <Route path="article" component={ArticleView}/>
        </Route>
    </Router>),
  document.getElementById('wrapper')
);
