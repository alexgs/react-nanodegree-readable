import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Author from './Author';
import CommentData from './CommentData';
import EditDeleteButtons from './EditDeleteButtons';
import Score from './Score';
import Title from './Title';
import { deletePost, downloadPostsStart, downVotePost, upVotePost } from './actions';
import CommentList from '../Comments/CommentList';
import FlexRow from '../General/FlexRow';
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

class PostDetail extends PureComponent {
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
                <article className="row" style={ articleStyle }>
                    <FlexRow>
                        <Score
                            downVoteFunction={ this.downVotePost }
                            postId={ postId }
                            score={ postData.get( 'voteScore' ) }
                            upVoteFunction={ this.upVotePost }
                        />
                        <Author author={ postData.get( 'author' ) } />
                        <CommentData commentCount={ commentCount } />
                        <EditDeleteButtons
                            deleteFunction={ this.deletePost }
                            postId={ postId }
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
                        commentData={ this.props[ STORE_COMMENTS_DATA ] }
                        commentList={ commentsByPost.get( postId ) }
                        postId={ postId }
                    />
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

export default connect( mapStateToProps )( PostDetail );
