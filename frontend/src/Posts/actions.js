import { fetchPosts } from '../api';
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
        return fetchPosts()
            .then( payload => dispatch( downloadPostsComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    }
};
