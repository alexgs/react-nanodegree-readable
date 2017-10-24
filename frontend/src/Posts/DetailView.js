import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import uuid from 'uuid/v4';
import Author from './Author';
import CommentData from './CommentData';
import EditPostContainer from './EditPostContainer';
import Title from './Title';
import { deletePost, downloadPostsStart, downVotePost, upVotePost } from './actions';
import { getCommentCount } from './utils';
import CommentList from '../Comments/CommentList';
import NewCommentContainer from '../Comments/NewCommentContainer';
import {
    deleteComment,
    downVoteComment,
    editComment,
    submitNewComment,
    upVoteComment,
    updateExistingComment
} from '../Comments/actions';
import EditDeleteButtons from '../Shared/EditDeleteButtons';
import FlexRow from '../Shared/FlexRow';
import Score from '../Shared/Score';
import { STORE_COMMENTS_BY_POST, STORE_COMMENTS_DATA, STORE_EDIT_COMMENT, STORE_POSTS_DATA } from '../constants';

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

// --- PRIVATE HELPER FUNCTIONS ---
function handleNewCommentSubmit( commentData, dispatch ) {
    // Check that we have necessary data
    const requiredCommentData = {
        author: _.isString,
        body: _.isString,
        parentId: _.isString
    };
    if ( !_.conformsTo( commentData, requiredCommentData ) ) {
        throw new Error( `Illegal comment data: ${ JSON.stringify( commentData ) }` );
    }

    // Populate defaults and dispatch
    const defaults = {
        id: uuid(),
        timestamp: Date.now()
    };
    const newCommentData = _.merge( {}, defaults, commentData );
    dispatch( submitNewComment( newCommentData ) );
}

function handleEditCommentSubmit( commentData, dispatch ) {
    // Check that we have necessary data
    const requiredCommentData = {
        body: _.isString,
        id: _.isString,
        timestamp: _.isInteger
    };
    if ( !_.conformsTo( commentData, requiredCommentData ) ) {
        throw new Error( `Illegal comment data: ${ JSON.stringify( commentData ) }` );
    }

    // Dispatch
    dispatch( updateExistingComment( commentData ) );
}

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

        this.state = {
            editPost: null
        };

        this.deleteComment = this.deleteComment.bind( this );
        this.deletePost = this.deletePost.bind( this );
        this.downVoteComment = this.downVoteComment.bind( this );
        this.downVotePost = this.downVotePost.bind( this );
        this.editComment = this.editComment.bind( this );
        this.editPost = this.editPost.bind( this );
        this.submitComment = this.submitComment.bind( this );
        this.submitModifiedPost = this.submitModifiedPost.bind( this );
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

    editComment( commentId ) {
        this.props.dispatch( editComment( commentId ) );
    }

    editPost( postId ) {
        this.setState( { editPost: postId } );
    }

    submitComment( commentData, newComment=true ) {
        if ( newComment ) {
            handleNewCommentSubmit( commentData, this.props.dispatch );
        } else {
            handleEditCommentSubmit( commentData, this.props.dispatch );
        }
    }

    submitModifiedPost( postData ) {
        // `postData` is an object with the following fields: body, ID, title
        const postDataSchema = {
            body: _.isString,
            id: _.isString,
            title: _.isString
        };
        if ( !_.conformsTo( postData, postDataSchema ) ) {
            throw new Error( `Illegal post data: ${ JSON.stringify( postData ) }` );
        }

        const { id, title } = postData;
        console.log( `--> ${id} | ${title} <--` );

        // TODO
        // this.props.dispatch( submitModifiedPost( postData ) );
        this.setState( { editPost: null } );
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

        // Data is not yet loaded, so bail on rendering
        if ( allPostData.size === 0 ) {
            return null;
        }

        const commentsByPost = this.props[ STORE_COMMENTS_BY_POST ];
        const commentData = this.props[ STORE_COMMENTS_DATA ];
        const editCommentId = this.props[ STORE_EDIT_COMMENT ];
        const postId = this.props.postId;
        const postData = allPostData.get( postId );
        const commentCount = getCommentCount( commentsByPost, commentData, postId );

        let postContent = null;
        if ( postId === this.state.editPost ) {
            postContent = <EditPostContainer
                body={ postData.get( 'body' ) }
                id={ postId }
                submitFunction={ this.submitModifiedPost }
                title={ postData.get( 'title' ) }
            />
        } else {
            postContent = (
                <div>
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
                </div>
            )
        }

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
                        editFunction={ this.editPost }
                        targetId={ postId }
                    />
                </FlexRow>
                { postContent }
                <CommentList
                    commentData={ commentData }
                    commentList={ commentsByPost.get( postId ) }
                    deleteFunction={ this.deleteComment }
                    downVoteFunction={ this.downVoteComment }
                    editCommentId={ editCommentId }
                    editFunction={ this.editComment }
                    submitFunction={ this.submitComment }
                    upVoteFunction={ this.upVoteComment }
                />
                <NewCommentContainer parentId={ postId } submitFunction={ this.submitComment } />
            </article>
        );
    }
}

const mapStateToProps = function( state ) {
    return {
        [STORE_COMMENTS_BY_POST]: state.get( STORE_COMMENTS_BY_POST ),
        [STORE_COMMENTS_DATA]: state.get( STORE_COMMENTS_DATA ),
        [STORE_EDIT_COMMENT]: state.get( STORE_EDIT_COMMENT),
        [STORE_POSTS_DATA]: state.get( STORE_POSTS_DATA )
    };
};

export default connect( mapStateToProps )( DetailView );
