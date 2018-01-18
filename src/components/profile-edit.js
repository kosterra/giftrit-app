import React from 'react'

import filestack from 'filestack-js';

const fsClient = filestack.init('ARg8PICxRfosu5qSBr0lQz');

const url = 'https://giftrit-service.herokuapp.com/api/users?sessionId=';

export default class ProfileEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files : [],
            firstname :'',
            lastname :'',
            username :'',
            phone : '',
            email : '',
            karma : '',
            description : '',
            userId : '',
            imageUrl : 'https://cdn.filestackcontent.com/0yoR223ESPujrXJYx1Ae'
        }

        fetch(url +  window.app.me.sessionId)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    firstname : data.data.firstname,
                    lastname : data.data.lastname,
                    username : data.data.username,
                    phone : data.data.phone,
                    email : data.data.email,
                    karma : data.data.karma,
                    description : data.data.description,
                    userId : data.data.userid,
                    imageUrl : data.data.imageurl
                });
            });
    }

    handleSubmit = e => {
        fetch(url + window.app.me.sessionId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer ' + window.localStorage['access_token']
            },
            body: JSON.stringify({
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                username : this.state.username,
                phone : this.state.phone,
                email : this.state.email,
                karma : this.state.karma,
                description : ProfileEdit.jsonEscape(this.state.description),
                userId : 2,
                imageUrl : this.state.imageUrl
            })
        }).then(response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            window.app.Router.redirectTo('/');
        }).catch(error => {
            this.setState({
                firstname : this.state.firstname,
                lastname : this.state.lastname,
                username : this.state.username,
                phone : this.state.phone,
                email : this.state.email,
                description : ProfileEdit.jsonEscape(this.state.description),
                userId : this.state.userId,
                imageUrl : this.state.imageUrl,
                type : 'danger',
                message : 'Failed to update the user profile. Please try again or contact us via contact form.'
            });
            console.log("Failed to update the user profile! " + error.message);
        });

        e.preventDefault();
    };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    };

    static jsonEscape(str)  {
        return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
    };

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
            <div className="profile-form-container">
                <form className="profile-form" onSubmit={this.handleSubmit}>
                    <div className="profile-form-inputs">
                        <div className="profile-form-images">
                            <div className="thumbnail">
                                <img className="img-responsive"
                                    src={imageUrl}
                                    alt="the profile"
                                />
                            </div>
                            <div className="text-center">
                                <button type="button"
                                    className="btn btn-filestack"
                                    onClick={this.setPicture}
                                >
                                    <i className="glyphicon glyphicon-upload" /> Upload
                                </button>
                            </div>
                        </div>
                        <div className="profile-form-data">
                            <h2>Edit your profile</h2>

                            <div className="user-firstname">
								<span>Firstname</span>
                                <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} placeholder="Enter your firstname" required />
                            </div>
                            <div className="user-lastname">
								<span>Lastname</span>
                                <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} placeholder="Enter your lastname" required />
                            </div>
                            <div className="user-username">
								<span>Username</span>
                                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Enter your username" required />
                            </div>
                            <div className="user-phone">
								<span>Phone</span>
                                <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Enter your phone number" required />
                            </div>
                            <div className="user-email">
								<span>E-Mail</span>
                                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter your email address" required />
                            </div>
                            <div className="user-description">
								<span>About me</span>
                                <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="Enter a description which describes you as a person" required /></div>
                        </div>
                    </div>
                    <div className="profile-form-submit">
                        <button>Save Profile</button>
                        <a href="/" className="cancel">Cancel</a>
                    </div>
                </form>
            </div>
        );
    }
}
