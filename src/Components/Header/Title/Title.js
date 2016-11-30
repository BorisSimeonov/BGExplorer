import React from 'react';

import './Title.css';

export default class Title extends React.Component {
    render() {
        let imageLogo = <img alt="*" src={require('./../../../Resourses/Images/traveler.png')} />;

        return (
            <h1 className="header-title">
                {imageLogo}
                <span color="blue">EXPLORER</span>
                <span>BULGARIA</span>
                {imageLogo}
            </h1>
        )
    }
}
