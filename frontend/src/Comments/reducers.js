import Immutable from 'immutable';
import {
    COMMENT_DELETE_COMPLETE,
    COMMENT_START_EDIT,
    COMMENT_SUBMIT_NEW_COMPLETE,
    COMMENT_UPDATE_COMPLETE,
    COMMENT_VOTE_COMPLETE,
    DOWNLOAD_COMMENTS_COMPLETE
} from '../constants';

const commentsByPostDefaultState = Immutable.Map();
const commentsDataDefaultState = Immutable.Map();

export const commentsByPostReducer = function( state=commentsByPostDefaultState, action ) {
    switch( action.type ) {
        case DOWNLOAD_COMMENTS_COMPLETE:
            return state.withMutations( mutableState => {
                action.data.comments.forEach( comment => {
                    // TODO [Future] Use arrays or mutable Sets to improve performance
                    let postComments = mutableState.get( comment.parentId ) || Immutable.Set();
                    postComments = postComments.add( comment.id );
                    mutableState.set( comment.parentId, postComments );
                } );
            } );
        case COMMENT_SUBMIT_NEW_COMPLETE:
            const commentData = action.data;
            let postComments = state.get( commentData.parentId ) || Immutable.Set();
            postComments = postComments.add( commentData.id );
            return state.set( commentData.parentId, postComments );
        default:
            return state;
    }
};

export const commentsDataReducer = function( state=commentsDataDefaultState, action ) {
    switch( action.type ) {
        case DOWNLOAD_COMMENTS_COMPLETE:
            return state.withMutations( mutableState => {
                action.data.comments.forEach( comment => {
                    mutableState.set( comment.id, Immutable.fromJS( comment ) );        // Add or update comment data
                } );
            } );
        case COMMENT_DELETE_COMPLETE:           // fall-through
        case COMMENT_SUBMIT_NEW_COMPLETE:       // fall-through
        case COMMENT_UPDATE_COMPLETE:           // fall-through
        case COMMENT_VOTE_COMPLETE:
            const comment = action.data;
            return state.set( comment.id, Immutable.fromJS( comment ) );
        default:
            return state;
    }
};

export const commentsEditReducer = function( state=null, action ) {
    switch( action.type ) {
        case COMMENT_START_EDIT:
            return action.data;
        case COMMENT_UPDATE_COMPLETE:
            return null;
        default:
            return state;
    }
};
