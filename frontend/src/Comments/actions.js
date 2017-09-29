import { DOWNLOAD_COMMENTS_COMPLETE } from '../constants';
import { fetchComments } from '../api';

export const downloadCommentsComplete = function( commentsList ) {
    return {
        type: DOWNLOAD_COMMENTS_COMPLETE,
        data: { comments: commentsList }
    };
};

export const downloadCommentsStart = function( postId ) {
    return function( dispatch ) {
        return fetchComments( postId )
            .then( payload => dispatch( downloadCommentsComplete( payload ) ) )
            .catch( error => console.log( `>>> ERROR: ${error} <<<` ) );
    }
};
