import * as api from '../api';
import { thunkPromiseChainErrorHandler } from '../utils';
import { DOWNLOAD_POSTS_COMPLETE, ERROR_SOURCE_API } from '../constants';

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
    return {
        type: 'down-vote-post',
        data: `Ouch! That's -1 for ${postId}`
    };
};

export const postVoteComplete = function( postData ) {
    return {
        type: 'post-vote-complete',
        data: `The change in score for ${postData.id} is complete.`
    };
};

export const upVotePost = function( postId ) {
    return function( dispatch ) {
        return api.sendPostUpVote( postId )
            .then( payload => dispatch( postVoteComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    }
};
