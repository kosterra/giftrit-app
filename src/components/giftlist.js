import React from 'react'
import SearchInput, {createFilter} from 'react-search-input'
import Loader from './loader'
import Banner from './banner'

const url = 'https://giftrit-service.herokuapp.com/api/gifts';

const KEYS_TO_FILTERS = ['title', 'description'];

export default class GiftList extends React.Component {
    constructor (props) {
        super(props);

        this.showMore = this.showMore.bind(this);

        this.state = {
            searchTerm : '',
            giftItems : [],
            numberOfGifts : 0,
            limit : 6,
            showMore : false
        };

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    loading : false,
                    giftItems : data.data,
                    numberOfGifts : data.data.length,
                    showMore : data.data.length > this.state.limit,
                });
            }).catch(error => {
                this.setState({
                    showMore : false,
                    type: 'danger',
                    message: 'Sorry there was a problem loading the gifts. Please try again later or contact us via contact form.'
                });
                console.log("Failed to load gifts! " + error.message);
            });

        this.searchUpdated = this.searchUpdated.bind(this)
    }

    showMore() {
        this.setState({
            showMore: this.state.limit < this.state.numberOfGifts,
            limit: this.state.limit + 3
        });
    }

    renderButton() {
        // show button only if state.showMore set to true
        if (!this.state.showMore) {
            return null;
        }
        return (
            <button onClick={this.showMore}>More Gifts</button>
        );
    }

    calculatePercent(amount, donated) {
        return ((donated / amount) * 100).toFixed(0);
    }

    render () {
        const filteredGifts = this.state.giftItems.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        let giftContainer = null;
        if (filteredGifts.length > 0) {
            giftContainer = <div className="gift-container">
                {filteredGifts.slice(0, this.state.limit).map(gift => {
                    return (
                        <div className="gift-item" key={gift.id}>
                            <div className="gift-info">
                                <img src={gift.imageurl} alt="the gift"/>
                                <div className="title" title={gift.title}>{GiftList.shorten(gift.title, 30)}</div>
                                <div className="description"
                                     title={gift.description}>{GiftList.shorten(gift.description, 95)}</div>
                                <div className="username-label">by <span className="username">{gift.username}</span>
                                </div>
                                <div className="actions-percent">
                                    <div className="actions">
                                        <a href={"/giftdetail/" + gift.id} className="fa fa-eye"/>
                                    </div>
                                    <div className="percent">
                                        <div>{this.calculatePercent(gift.amount, gift.donatedamount)}%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>;
        }

        return (
            <div className="gift-list">
                <div className="gift-list-search">
                    <div className="gift-list-search-title">
                        <h1>Discover the gifts</h1>
                        <p>{this.state.numberOfGifts} gifts to discover</p>
                    </div>
                    <SearchInput className="search-input" onChange={this.searchUpdated} />
                </div>
                { this.state.giftItems.length > 0 ? giftContainer : <Loader /> }

                { this.state.giftItems.length > 0 &&
                    <div className="gifts-showmore">
                        {this.renderButton()}
                    </div>
                }

                { this.state.type && this.state.type === 'danger' && <div className="alert-message" >{this.state.message}</div> }

                <Banner />
            </div>
        )
    }

    searchUpdated (term) {
        this.setState({searchTerm: term})
    }

    static shorten(text, maxLength) {
        let ret = text;
        if (ret.length > maxLength) {
            ret = ret.substr(0,maxLength-3) + '…';
        }
        return ret;
    }
}