import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class PostSummary extends PureComponent {
    static propTypes = {
        author: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        deleted: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired
    };

    render() {
        return <h2>{ this.props.title }</h2>
    }
}

export default PostSummary;
