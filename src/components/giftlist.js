import React from 'react'
import SearchInput, {createFilter} from 'react-search-input'
import '../stylesheets/components/_giftlist.scss';

const url = 'https://giftrit-service.herokuapp.com/api/gifts';

const KEYS_TO_FILTERS = ['title', 'description'];

export default class GiftList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            searchTerm: '',
            giftItems: [],
            numberOfGifts: 0
        };

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({ giftItems : data.data, numberOfGifts : data.data.length });
            });

        this.searchUpdated = this.searchUpdated.bind(this)
    }

    render () {
        const filteredGifts = this.state.giftItems.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        let giftContainer = null;
        if (filteredGifts.length > 0) {
            giftContainer = <div className="gift-container">
                {filteredGifts.map(gift => {
                    return (
                        <a href={"giftdetail/" + gift.id} >
                            <div className="gift-item" key={gift.id}>
                                <div className="gift-info">
                                    <div className="title">{gift.title}</div>
                                    <div className="description" title={gift.description}>{this.shorten(gift.description, 45)}</div>
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
            </div>
        )
    }

    searchUpdated (term) {
        this.setState({searchTerm: term})
    }

    shorten(text, maxLength) {
        let ret = text;
        if (ret.length > maxLength) {
            ret = ret.substr(0,maxLength-3) + '…';
        }
        return ret;
    }
}