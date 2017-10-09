import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Author from './Author';
import FlexRow from '../General/FlexRow';
import Score from '../Posts/Score';

const commentRowStyle = {
    marginTop: 10,
};

class Comment extends PureComponent {
    static propTypes = {
        author: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        deleted: PropTypes.bool.isRequired,
        downVoteFunction: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        parentDeleted: PropTypes.bool.isRequired,
        timestamp: PropTypes.number.isRequired,
        upVoteFunction: PropTypes.func.isRequired,
        voteScore: PropTypes.number.isRequired
    };

    render() {
        const { author, body, deleted, downVoteFunction, id, timestamp, upVoteFunction, voteScore } = this.props;
        return (
            <div className="row" style={ commentRowStyle }>
                <Author author={ author } />
                <div className="col-xs-12">
                    { body }
                </div>
                <FlexRow>
                    <Score
                        downVoteFunction={ downVoteFunction }
                        postId={ id }
                        score={ voteScore }
                        upVoteFunction={ upVoteFunction }
                    />
                </FlexRow>
            </div>
        );
    };
}

export default Comment;
