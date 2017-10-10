import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Author from './Author';
import EditDeleteButtons from '../Shared/EditDeleteButtons';
import FlexRow from '../Shared/FlexRow';
import Score from '../Shared/Score';

const commentRowStyle = {
    marginTop: 10,
};

class Comment extends PureComponent {
    static propTypes = {
        author: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        deleted: PropTypes.bool.isRequired,
        deleteFunction: PropTypes.func.isRequired,
        downVoteFunction: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        parentDeleted: PropTypes.bool.isRequired,
        timestamp: PropTypes.number.isRequired,
        upVoteFunction: PropTypes.func.isRequired,
        voteScore: PropTypes.number.isRequired
    };

    render() {
        const { author, body, deleted, deleteFunction, downVoteFunction, id, timestamp, upVoteFunction, voteScore } = this.props;
        return (
            <div className="row" style={ commentRowStyle }>
                <Author author={ author } />
                <div className="col-xs-12">
                    { body }
                </div>
                <FlexRow>
                    <Score
                        downVoteFunction={ downVoteFunction }
                        score={ voteScore }
                        targetId={ id }
                        upVoteFunction={ upVoteFunction }
                    />
                    <EditDeleteButtons deleteFunction={ deleteFunction } targetId={ id }/>
                </FlexRow>
            </div>
        );
    };
}

export default Comment;
