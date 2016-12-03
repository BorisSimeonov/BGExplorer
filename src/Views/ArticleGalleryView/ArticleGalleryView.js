import React from 'react';

import $ from 'jquery';

export default class ArticleGalleryView extends React.Component {
    render() {
        if (sessionStorage.getItem('authToken')) {
            let images = this.props.imageObjectsList.map(imageObject => {
                return <img className="gallery-image" key={imageObject._id}
                            src={imageObject._downloadURL} alt="Missing"
                            onClick={this.resizeSelectedImage.bind(this)}/>
            });
            console.log(images);
            return (
                <div className="gallery-holder">
                    <h1><span>Location</span> Gallery</h1>
                    {images}
                </div>
            )
        } else {
            return (
                <p>Please login first.</p>
            )
        }
    }

    resizeSelectedImage(event) {
        let targetImage = $(event.target);
        let currentDisplayStyle = targetImage.css('display');
        switch (currentDisplayStyle) {
            case 'inline-block':
                targetImage.css('display', 'block');
                targetImage.css('width', '97%');
                targetImage.css('margin', '10px auto');
                break;
            case 'block':
                targetImage.css('display', 'inline-block');
                targetImage.css('width', '14%');
                targetImage.css('margin', '10px');
                break;
            default:
                break;
        }
    }
}
