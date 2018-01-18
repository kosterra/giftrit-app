import React from 'react';

export default class Banner extends React.Component {
    render() {
        return (
            <div className="banner-content">
                <div className="banner-row">
                    <div className="banner-item">
                        <span className="banner-text">advert 1</span>
                    </div>
                    <div className="banner-item">
                        <span className="banner-text">advert 2</span>
                    </div>
                    <div className="banner-item">
                        <span className="banner-text">advert 3</span>
                    </div>
                    <div className="banner-item">
                        <span className="banner-text">advert 4</span>
                    </div>
                    <div className="banner-item">
                        <span className="banner-text">advert 5</span>
                    </div>
                </div>
            </div>
        )
    }
}