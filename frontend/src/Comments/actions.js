import * as api from '../api';
import { thunkPromiseChainErrorHandler } from '../utils';
import { DOWNLOAD_COMMENTS_COMPLETE, DOWNLOAD_ONE_COMMENT_COMPLETE, ERROR_SOURCE_API } from '../constants';

export const deleteComment = function( commentId ) {
    console.log( `>>> Ouch! Deleted comment ${commentId} <<<` );
    // TODO
    return {
        type: 'EMPTY'
    };
};

export const downloadCommentsComplete = function( commentsList ) {
    return {
        type: DOWNLOAD_COMMENTS_COMPLETE,
        data: { comments: commentsList }
    };
};

export const downloadCommentsStart = function( postId ) {
    return function( dispatch ) {
        return api.fetchComments( postId )
            .then( payload => dispatch( downloadCommentsComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    }
};

export const downloadOneCommentComplete = function( commentData ) {
    return {
        type: DOWNLOAD_ONE_COMMENT_COMPLETE,
        data: commentData
    };
};

export const downVoteComment = function( commentId ) {
    return function( dispatch ) {
        // We can get the parent post ID from the payload, if we need it
        return api.sendCommentDownVote( commentId )
            .then( payload => dispatch( downloadOneCommentComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    };
};

export const upVoteComment = function( commentId ) {
    return function( dispatch ) {
        return api.sendCommentUpVote( commentId )
            .then( payload => dispatch( downloadOneCommentComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    };
};
