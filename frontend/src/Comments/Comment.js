import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Author from './Author';

const commentRowStyle = {
    marginTop: 10,
};

class Comment extends PureComponent {
    static propTypes = {
        author: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        deleted: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        parentDeleted: PropTypes.bool.isRequired,
        timestamp: PropTypes.number.isRequired,
        voteScore: PropTypes.number.isRequired
    };

    render() {
        const { author, body, deleted, id, timestamp, voteScore } = this.props;
        return (
            <div className="row" style={ commentRowStyle }>
                <Author author={ author } />
                <div className="col-xs-12">
                    { body }
                </div>
                <div className="col-xs-12">
                    Score: { voteScore }
                </div>
            </div>
        );
    };
}

export default Comment;
