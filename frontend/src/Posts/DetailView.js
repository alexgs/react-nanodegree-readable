import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import uuid from 'uuid/v4';
import Author from './Author';
import CommentData from './CommentData';
import EditDeleteButtons from '../Shared/EditDeleteButtons';
import Title from './Title';
import { deletePost, downloadPostsStart, downVotePost, upVotePost } from './actions';
import { getCommentCount } from './utils';
import CommentForm from '../Comments/CommentForm';
import CommentList from '../Comments/CommentList';
import { deleteComment, downVoteComment, submitComment, upVoteComment } from '../Comments/actions';
import FlexRow from '../Shared/FlexRow';
import Score from '../Shared/Score';
import { STORE_COMMENTS_BY_POST, STORE_COMMENTS_DATA, STORE_POSTS_DATA } from '../constants';

const articleStyle = {
    fontSize: '120%',
    marginTop: 10
};

const titleStyle = {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5
};

// TODO A mechanism for adding a new comment is visible on the detail page and functional.
class DetailView extends PureComponent {
    static propTypes = {
        postId: PropTypes.string.isRequired,
        [STORE_COMMENTS_BY_POST]: ImmutablePropTypes.mapOf(
            ImmutablePropTypes.setOf( PropTypes.string )
        ).isRequired,
        [STORE_COMMENTS_DATA]: ImmutablePropTypes.mapContains( {
            author: PropTypes.string,
            body: PropTypes.string,
            deleted: PropTypes.bool,
            id: PropTypes.string,
            parentDeleted: PropTypes.bool,
            parentId: PropTypes.string,
            timestamp: PropTypes.number,
            voteScore: PropTypes.number,
        } ).isRequired,
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
        this.deleteComment = this.deleteComment.bind( this );
        this.deletePost = this.deletePost.bind( this );
        this.downVoteComment = this.downVoteComment.bind( this );
        this.downVotePost = this.downVotePost.bind( this );
        this.submitComment = this.submitComment.bind( this );
        this.upVoteComment = this.upVoteComment.bind( this );
        this.upVotePost = this.upVotePost.bind( this );
    }

    deleteComment( commentId ) {
        this.props.dispatch( deleteComment( commentId ) );
    }

    deletePost( postId ) {
        this.props.dispatch( deletePost( postId ) );
    }

    downVoteComment( commentId ) {
        this.props.dispatch( downVoteComment( commentId ) );
    }

    downVotePost( postId ) {
        this.props.dispatch( downVotePost( postId ) );
    }

    submitComment( postId, author, body ) {
        const commentId = uuid();
        const timestamp = Date.now();
        this.props.dispatch( submitComment( {
            author,
            body,
            id: commentId,
            parentId: postId,
            timestamp
        } ) );
    }

    upVoteComment( commentId ) {
        this.props.dispatch( upVoteComment( commentId ) );
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
        const commentData = this.props[ STORE_COMMENTS_DATA ];
        if ( allPostData.size > 0 ) {
            const postId = this.props.postId;
            const postData = allPostData.get( postId );
            const commentCount = getCommentCount( commentsByPost, commentData, postId );

            return (
                <article className="row" style={ articleStyle }>
                    <FlexRow>
                        <Score
                            downVoteFunction={ this.downVotePost }
                            score={ postData.get( 'voteScore' ) }
                            targetId={ postId }
                            upVoteFunction={ this.upVotePost }
                        />
                        <Author author={ postData.get( 'author' ) } />
                        <CommentData commentCount={ commentCount } />
                        <EditDeleteButtons
                            deleteFunction={ this.deletePost }
                            targetId={ postId }
                        />
                    </FlexRow>
                    <div className="col-xs-12">
                        <Title
                            category={ postData.get( 'category' ) }
                            postId={ postId }
                            style={ titleStyle }
                            title={ postData.get( 'title' ) }
                        />
                    </div>
                    <div className="col-xs-12">
                        <div className="row">
                            <content className="col-xs-8">
                                { postData.get( 'body' ) }
                            </content>
                        </div>
                    </div>
                    <CommentList
                        commentData={ commentData }
                        commentList={ commentsByPost.get( postId ) }
                        deleteFunction={ this.deleteComment }
                        downVoteFunction={ this.downVoteComment }
                        upVoteFunction={ this.upVoteComment }
                    />
                    <CommentForm parentPostId={ postId } submitCommentFunction={ this.submitComment } />
                </article>
            );
        } else {
            return null;
        }
    }
}

const mapStateToProps = function( state ) {
    return {
        [STORE_COMMENTS_BY_POST]: state.get( STORE_COMMENTS_BY_POST ),
        [STORE_COMMENTS_DATA]: state.get( STORE_COMMENTS_DATA ),
        [STORE_POSTS_DATA]: state.get( STORE_POSTS_DATA )
    };
};

export default connect( mapStateToProps )( DetailView );
