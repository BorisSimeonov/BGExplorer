import React from 'react';

import './App.css';
import appStore from './Stores/AppStore';
import $ from 'jquery';

import ErrorBox from './Components/MessageBoxes/ErrorBox/ErrorBox';
import Header from './Components/Header/Header';
import InfoBox from  './Components/MessageBoxes/InfoBox/InfoBox';
import LoadingBox from './Components/MessageBoxes/LoadingBox/LoadingBox';
import Navigation from './Components/Navigation/Navigation';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = appStore.getUserInfo();
    }

    componentWillMount() {
        appStore.on('userChange', () => {
            let newState  = appStore.getUserInfo();
            this.setState({
                username: newState.username,
                userId: newState.userId
            });
        });
    }

    componentDidMount() {
        $(document).on({
            ajaxStart: function () {
                $('#loadingBox').show()
            },
            ajaxStop: function () {
                $('#loadingBox').hide()
            }
        });

        $(document).ajaxError(this.handleAjaxError.bind(this));
        $('#errorBox').on('click', function () {
            $(this).hide();
        });
    }

    handleAjaxError(event, response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        this.showError(errorMsg);
    }

    showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg).show();
    }

    static showInfo(message) {
        $('#infoBox').text(message).show();
        setTimeout(function () {
            $('#infoBox').fadeOut();
        }, 1500);
    }

    render() {
        const { username } = this.state;
        return (
            <div className="App">
                <Header username={username}/>
                <Navigation username={username}/>
                <hr className="separator" />
                <LoadingBox />
                <InfoBox />
                <ErrorBox />
                {this.props.children}
            </div>
        );
    }

}
