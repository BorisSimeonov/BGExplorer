import React from 'react';

import './HomeView.css';

export default class HomeView extends React.Component {
    render() {
        let homeLogoImage = <img alt="Dream, Learn, Explore ..." src={require('./../../Resources/Images/app-logo.jpg')} />;
        return (
            <div className="app-home">
                {homeLogoImage}
            </div>
        )
    }
}
