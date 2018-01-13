import React from 'react'
import SearchInput, {createFilter} from 'react-search-input'

const url = 'https://giftrit-service.herokuapp.com/api/gifts';

const KEYS_TO_FILTERS = ['title', 'description'];

export default class GiftList extends React.Component {
    constructor (props) {
        super(props);

        this.showMore = this.showMore.bind(this);

        this.state = {
            searchTerm: '',
            giftItems: [],
            numberOfGifts: 0,
            limit: 6,
            showMore: true
        };

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ giftItems : data.data, numberOfGifts : data.data.length });
            });

        this.searchUpdated = this.searchUpdated.bind(this)
    }

    showMore() {
        this.setState({
            limit: this.state.limit + 3,
            showMore: this.state.limit < this.state.numberOfGifts
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

    render () {
        const filteredGifts = this.state.giftItems.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        let giftContainer = null;
        if (filteredGifts.length > 0) {
            giftContainer = <div className="gift-container">
                {filteredGifts.slice(0, this.state.limit).map(gift => {
                    return (
                        <a href={"giftdetail/" + gift.id} >
                            <div className="gift-item" key={gift.id} style={{backgroundImage: "url(" + gift.imageurl + ")"}} >
                                <div className="gift-info">
                                    <div className="title">{gift.title}</div>
                                    <div className="description" title={gift.description}>{GiftList.shorten(gift.description, 40)}</div>
                                    <div className="userinfo">by <span className="username">username</span></div>
                                </div>
                            </div>
                        </a>
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
                {giftContainer}
                <div className="gifts-showmore">
                    { this.renderButton() }
                </div>
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