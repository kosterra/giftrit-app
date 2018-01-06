import React from 'react'

import '../stylesheets/components/_giftform.scss';

import filestack from 'filestack-js';

/*const fsClient = filestack.init(process.env.FILEPICKER_API_KEY);*/
const fsClient = filestack.init('ARg8PICxRfosu5qSBr0lQz');

const url = 'https://giftrit-service.herokuapp.com/api/gifts';

export default class GiftForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            title:'',
            amount:'',
            description:'',
            created: new Date().toISOString().slice(0,10),
            modified: new Date().toISOString().slice(0,10),
            userId: 2,
            karma: 0,
            userKarma: 0,
            imageUrl: null,
            imageMetadata: null
        }
    }

    handleSubmit = e => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(window.localStorage['access_token'])
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                amount: this.state.amount,
                created: this.state.created,
                modified: this.state.modified,
                userId: 2,
                karma: this.state.karma,
                imageUrl: this.state.imageUrl
            })
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(response => {
            this.setState({
                title: '',
                description: '',
                amount: '',
                created: this.state.created,
                modified: this.state.modified,
                userId: 0,
                karma: 0,
                userKarma: 0,
                type: 'success',
                message: 'Thank you for creating a new gift.'
            });
            console.log("Gift created successfully! " + response);
        }).catch(error => {
            this.setState({
                title: this.state.title,
                description: this.state.description,
                amount: this.state.amount,
                created: this.state.created,
                modified: this.state.modified,
                userId: 2,
                karma: 0,
                userKarma: 0,
                type: 'danger',
                message: 'Failed to create a new gift. Please try again or contact us via contact form.'
            });
            console.log("Failed to create a new gift! " + error.message);
        });

        e.preventDefault();
    };

    handleChange = e => {
        if (e.target.name === 'amount') {
            this.calculateKarma(e.target.value);
        }

        this.setState({ [e.target.name]: e.target.value })
    };

    calculateKarma(amount) {
        fetch('https://giftrit-service.herokuapp.com/api/karmas')
            .then(res => res.json())
            .then(data => {
                let karma = 0;
                let userKarma = this.state.userKarma;
                let karmas = data.data;

                for (let i = 0; i < karmas.length; i++) {
                    let karmaObj = karmas[i];

                    if (parseInt(karmaObj.amount) <= amount) {
                        karma = karmaObj.karmapoints;
                        userKarma = (userKarma - karmaObj.karmapoints);
                    }
                }

                this.setState({ karma : karma, userKarma : userKarma });
            });
    }

    /*
     * From here this are the methods to upload images to filestack
     */
    uploadImage = () => {
        return fsClient.pick(
            {
                accept: 'image/*',
                maxSize: 1024 * 1024 * 2
            }
        );
    };

    getMetadata = (handle) => {
        fsClient.metadata(handle)
            .then(metadata => this.setState({ imageMetadata : metadata }))
            .catch(err => console.log(err));
    };

    setPicture = () => {
        this.uploadImage()
            .then(data => {
                const { url, handle } = data.filesUploaded[0];
                this.setState({ imageUrl : url });
                this.getMetadata(handle);
                console.log(JSON.stringify(data.filesUploaded));
            })
            .catch(err => console.log(err));
    };

    render() {
        const imageUrl = this.state.imageUrl;

        return (
            <div className="gift-form-container">
                <form className="gift-form" onSubmit={this.handleSubmit}>
                    <div className="gift-form-inputs">
                        <div className="gift-form-images">
                            <div className="thumbnail">
                                <img
                                    className="img-responsive"
                                    src={imageUrl || 'http://placehold.it/800x600?text=Upload+a+Photo'}
                                    alt="the gift"
                                />
                            </div>
                            <div className="text-center">
                                <button
                                    type="button"
                                    className="btn btn-filestack"
                                    onClick={this.setPicture}
                                >
                                    <i className="glyphicon glyphicon-upload" /> Upload
                                </button>
                            </div>
                        </div>
                        <div className="gift-form-data">
                            <h2>State your wish...</h2>

                            <div className="gift-title">
                                <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Enter a name for your gift" required />
                            </div>
                            <div className="gift-amount">
                                <input type="number" name="amount" min={0} max={10000} value={this.state.amount} onChange={this.handleChange} placeholder="CHF" required />
                                <span>Enter the max amount of money you need to get this gift</span>
                            </div>
                            <div className="gift-description">
                                <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="Enter a description for your gift. Your story decides, if a giftr wants to help you or not" required /></div>
                        </div>
                    </div>
                    <div className="gift-form-submit">
                        <div className="gift-gkp">This wish requires <span className="karma gkp">{this.state.karma > 0 ? this.state.karma : 0} gkp!</span></div>
                        <div className="gift-gkp">After you stated your wish, you will have&nbsp;
                            <span className={"karma " + (100 > 0 ? 'gkp' : 'bkp')}>
                                {100} {100 > 0 ? 'gkp!' : 'bkp!'}
                            </span>
                        </div>
                        <button>That sounds fair!</button>
                        <a href="/" className="cancel">Cancel</a>
                    </div>
                </form>
            </div>
        );
    }
}