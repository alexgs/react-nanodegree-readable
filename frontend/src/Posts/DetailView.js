import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Summary from './Summary';
import { deletePost, downloadPostsStart, downVotePost, upVotePost } from './actions';
import { STORE_COMMENTS_BY_POST, STORE_POSTS_DATA } from '../constants';

class PostDetail extends PureComponent {
    static propTypes = {
        postId: PropTypes.string.isRequired,
        [STORE_COMMENTS_BY_POST]: ImmutablePropTypes.mapOf(
            ImmutablePropTypes.setOf( PropTypes.string )
        ).isRequired,
        [STORE_POSTS_DATA]: ImmutablePropTypes.mapContains( {
            author: PropTypes.string,
            body: PropTypes.string,
            category: PropTypes.string,
            deleted: PropTypes.bool,
            id: PropTypes.string,
            timestamp: PropTypes.number,
            title: PropTypes.string,
            voteScore: PropTypes.number
        } ).isRequired

    };

    constructor( props ) {
        super( props );
        this.deletePost = this.deletePost.bind( this );
        this.downVotePost = this.downVotePost.bind( this );
        this.upVotePost = this.upVotePost.bind( this );
    }

    deletePost( postId ) {
        this.props.dispatch( deletePost( postId ) );
    }

    downVotePost( postId ) {
        this.props.dispatch( downVotePost( postId ) );
    }

    upVotePost( postId ) {
        this.props.dispatch( upVotePost( postId ) );
    }

    componentDidMount() {
        this.props.dispatch( downloadPostsStart() );
    }

    render() {
        const allPostData = this.props[ STORE_POSTS_DATA ];
        const commentsByPost = this.props[ STORE_COMMENTS_BY_POST ];
        if ( allPostData.size > 0 ) {
            const postId = this.props.postId;
            const postData = allPostData.get( postId );
            const commentsLoaded = commentsByPost.size > 0;     // Assume at least one post with at least one comment
            const commentCount = commentsLoaded && commentsByPost.has( postId ) ? commentsByPost.get( postId ).size : 0;

            return (
                <Summary
                    author={ postData.get( 'author' ) }
                    body={ postData.get( 'body' ) }
                    category={ postData.get( 'category' ) }
                    commentCount={ commentCount }
                    deleteFunction={ this.deletePost }
                    downVoteFunction={ this.downVotePost }
                    id={ postId }
                    showSummary={ false }
                    timestamp={ postData.get( 'timestamp' ) }
                    title={ postData.get( 'title' ) }
                    upVoteFunction={ this.upVotePost }
                    voteScore={ postData.get( 'voteScore' ) }
                />
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = function( state ) {
    return {
        [STORE_COMMENTS_BY_POST]: state.get( STORE_COMMENTS_BY_POST ),
        [STORE_POSTS_DATA]: state.get( STORE_POSTS_DATA )
    };
};

export default connect( mapStateToProps )( PostDetail );
