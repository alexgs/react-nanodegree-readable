import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

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
            voteScore: PropTypes.number,
        } ),
        commentList: ImmutablePropTypes.setOf( PropTypes.string ),
        postId: PropTypes.string.isRequired
    };

    render() {
        const { commentData, commentList, postId } = this.props;
        if ( !commentList || commentList.size === 0 ) {
            return null;
        }

        // Fix this and just loop over the IDs in `commentList`
        const comments = commentData.toArray()
            .filter( comment => comment.parentId === postId )
            .sort( ( a, b ) => a.timestamp - b.timestamp )
            .map( comment => (
                <div>{ comment.body }</div>
            ) )
        ;

        const betterComments = commentList.toArray()
            .map( commentId => {
                const data = commentData.get( commentId );
                return (
                    <div key={ data.get( 'id') }>{ data.get( 'body' ) }</div>
                );
            } )
        ;

        return ( <div>{ betterComments }</div> );
    }
}

export default CommentList;
