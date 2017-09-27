import { DOWNLOAD_POSTS_COMPLETE } from '../constants';
import { fetchPosts } from '../api';

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
            .catch( error => console.log( `>>> ERROR: ${error} <<<` ) );
    }
};
