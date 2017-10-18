import _ from 'lodash';
import * as api from '../api';
import { thunkPromiseChainErrorHandler } from '../utils';
import { DOWNLOAD_COMMENTS_COMPLETE, DOWNLOAD_ONE_COMMENT_COMPLETE, ERROR_SOURCE_API } from '../constants';

export const deleteComment = function( commentId ) {
    console.log( `>>> Ouch! Deleted comment ${commentId} <<<` );
    return function( dispatch ) {
        return api.deleteComment( commentId )
            .then( payload => dispatch( downloadOneCommentComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    }
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

export const submitComment = function( commentData ) {
    // commentData is an object with the following fields: author, body, id, parentId, timestamp
    return function( dispatch ) {
        return api.submitComment( commentData )
            .then( payload => {
                const mergedCommentData = _.merge( {}, payload, commentData );
                dispatch( downloadOneCommentComplete( mergedCommentData ) );
            } )
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
