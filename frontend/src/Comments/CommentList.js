import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Comment from './Comment';

class CommentList extends PureComponent {
    static propTypes = {
        commentData: ImmutablePropTypes.mapContains( {
            author: PropTypes.string,
            body: PropTypes.string,
            deleted: PropTypes.bool,
            id: PropTypes.string,
            parentDeleted: PropTypes.bool,
            parentId: PropTypes.string,
            timestamp: PropTypes.number,
            voteScore: PropTypes.number
        } ),
        commentList: ImmutablePropTypes.setOf( PropTypes.string ),
        downVoteFunction: PropTypes.func.isRequired,
        upVoteFunction: PropTypes.func.isRequired
        // , postId: PropTypes.string.isRequired
    };

    render() {
        const { commentData, commentList, downVoteFunction, upVoteFunction } = this.props;
        if ( !commentList || commentList.size === 0 ) {
            return null;
        }

        const commentsDisplay = commentList.toArray()
            .map( commentId => {
                const data = commentData.get( commentId );
                return (
                    <Comment
                        key={ data.get( 'id') }
                        author={ data.get( 'author' ) }
                        body={ data.get( 'body' ) }
                        deleted={ data.get( 'deleted' ) }
                        downVoteFunction={ downVoteFunction }
                        id={ data.get( 'id' ) }
                        parentDeleted={ data.get( 'parentDeleted' ) }
                        timestamp={ data.get( 'timestamp' ) }
                        upVoteFunction={ upVoteFunction }
                        voteScore={ data.get( 'voteScore' ) }
                    />
                );
            } );

        return (
            <div className="col-xs-8">{ commentsDisplay }</div>
        );
    }
}

export default CommentList;
