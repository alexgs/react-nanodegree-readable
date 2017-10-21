import _ from 'lodash';
import * as api from '../api';
import { thunkPromiseChainErrorHandler } from '../utils';
import {
    COMMENT_DELETE_COMPLETE,
    COMMENT_START_EDIT,
    COMMENT_SUBMIT_NEW_COMPLETE,
    COMMENT_UPDATE_COMPLETE,
    COMMENT_VOTE_COMPLETE,
    DOWNLOAD_COMMENTS_COMPLETE,
    ERROR_SOURCE_API
} from '../constants';

const commentVoteComplete = function( commentData ) {
    return {
        type: COMMENT_VOTE_COMPLETE,
        data: commentData
    };
};

export const deleteComment = function( commentId ) {
    return function( dispatch ) {
        return api.deleteComment( commentId )
            .then( payload => dispatch( deleteCommentComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    }
};

const deleteCommentComplete = function( commentData ) {
    return {
        type: COMMENT_DELETE_COMPLETE,
        data: commentData
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

export const downVoteComment = function( commentId ) {
    return function( dispatch ) {
        // We can get the parent post ID from the payload, if we need it
        return api.sendCommentDownVote( commentId )
            .then( payload => dispatch( commentVoteComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    };
};

export const editComment = function( commentId ) {
    return {
        type: COMMENT_START_EDIT,
        data: commentId
    };
};

export const submitNewComment = function( commentData ) {
    // `commentData` is an object with the following fields: author, body, id, parentId, timestamp
    return function( dispatch ) {
        return api.sendNewComment( commentData )
            .then( payload => {
                const mergedCommentData = _.merge( {}, payload, commentData );
                dispatch( submitNewCommentComplete( mergedCommentData ) );
            } )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    };
};

export const submitNewCommentComplete = function( commentData ) {
    return {
        type: COMMENT_SUBMIT_NEW_COMPLETE,
        data: commentData
    };
};

export const updateExistingComment = function( commentData ) {
    // commentData is an object with the following fields: body, id, timestamp
    return function( dispatch ) {
        const { body, id, timestamp } = commentData;
        return api.sendUpdatedComment( { body, timestamp }, id )
            .then( payload => {
                const mergedCommentData = _.merge( {}, payload, commentData );
                dispatch( updateExistingCommentComplete( mergedCommentData ) );
            } )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    };
};

const updateExistingCommentComplete = function( commentData ) {
    return {
        type: COMMENT_UPDATE_COMPLETE,
        data: commentData
    };
};

export const upVoteComment = function( commentId ) {
    return function( dispatch ) {
        return api.sendCommentUpVote( commentId )
            .then( payload => dispatch( commentVoteComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    };
};
