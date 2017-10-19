import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Comment from './Comment';

// TODO Comments should have a button for editing the comment.
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
        deleteFunction: PropTypes.func.isRequired,
        downVoteFunction: PropTypes.func.isRequired,
        upVoteFunction: PropTypes.func.isRequired
    };

    constructor( props ) {
        super( props );

        this.editComment = this.editComment.bind( this );

        // TODO Move state to Redux store
        this.state = {
            currentlyEditing: null
        };
    }

    editComment( commentId ) {
        this.setState( { currentlyEditing: commentId } );
    }

    render() {
        const { commentData, commentList, deleteFunction, downVoteFunction, upVoteFunction } = this.props;
        if ( !commentList || commentList.size === 0 ) {
            return null;
        }

        const commentsDisplay = commentList.toArray()
            .filter( commentId => {
                const data = commentData.get( commentId );
                return !data.get( 'deleted' );
            } )
            .map( commentId => {
                const data = commentData.get( commentId );
                return (
                    <Comment
                        key={ data.get( 'id') }
                        author={ data.get( 'author' ) }
                        body={ data.get( 'body' ) }
                        deleted={ data.get( 'deleted' ) }
                        deleteFunction={ deleteFunction }
                        downVoteFunction={ downVoteFunction }
                        editFunction={ this.editComment }
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
