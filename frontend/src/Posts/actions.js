import * as api from '../api';
import { thunkPromiseChainErrorHandler } from '../utils';
import { DOWNLOAD_POSTS_COMPLETE, ERROR_SOURCE_API, POST_VOTE_COMPLETE } from '../constants';

export const downloadPostsComplete = function( postsList ) {
    return {
        type: DOWNLOAD_POSTS_COMPLETE,
        data: { posts: postsList }
    };
};

export const downloadPostsStart = function() {
    return function( dispatch ) {
        return api.fetchPosts()
            .then( payload => dispatch( downloadPostsComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    }
};

export const downVotePost = function( postId ) {
    return function( dispatch ) {
        return api.sendPostDownVote( postId )
            .then( payload => dispatch( postVoteComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    }
};

export const postVoteComplete = function( postData ) {
    return {
        type: POST_VOTE_COMPLETE,
        data: postData
    };
};

export const upVotePost = function( postId ) {
    return function( dispatch ) {
        return api.sendPostUpVote( postId )
            .then( payload => dispatch( postVoteComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    }
};
