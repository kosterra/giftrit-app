import React from 'react'
import SearchInput, {createFilter} from 'react-search-input'
import '../stylesheets/components/_giftlist.scss';

const url = 'https://giftrit-service.herokuapp.com/api/gifts';
let gifts = [];

fetch(url)
    .then(res => res.json())
    .then(data => gifts = data.data);

const KEYS_TO_FILTERS = ['title', 'description'];

export default class GiftList extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            searchTerm: ''
        }
        this.searchUpdated = this.searchUpdated.bind(this)
    }

    render () {
        const filteredGifts = gifts.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        let giftContainer = null;
        if (filteredGifts.length > 0) {
            giftContainer = <div className="gift-container">
                {filteredGifts.map(gift => {
                    return (
                        <div className="gift-item" key={gift.id}>
                            <div className="gift-info">
                                <div className="title">{gift.title}</div>
                                <div className="description">{gift.description}</div>
                            </div>
                        </div>
                    )
                })}
            </div>;
        }
        return (
            <div className="gift-list">
                <SearchInput className="search-input" onChange={this.searchUpdated} />
                {giftContainer}
            </div>
        )
    }

    searchUpdated (term) {
        this.setState({searchTerm: term})
    }
}