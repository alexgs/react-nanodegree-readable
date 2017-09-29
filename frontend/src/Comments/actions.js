import { fetchComments } from '../api';
import { thunkPromiseChainErrorHandler } from '../utils';
import { DOWNLOAD_COMMENTS_COMPLETE, ERROR_SOURCE_API } from '../constants';

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
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    }
};
