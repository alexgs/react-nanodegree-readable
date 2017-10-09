import Immutable from 'immutable';
import { DOWNLOAD_COMMENTS_COMPLETE, DOWNLOAD_ONE_COMMENT_COMPLETE } from '../constants';

const commentsByPostDefaultState = Immutable.Map();
const commentsDataDefaultState = Immutable.Map();

export const commentsByPostReducer = function( state=commentsByPostDefaultState, action ) {
    switch( action.type ) {
        case DOWNLOAD_COMMENTS_COMPLETE:
            return state.withMutations( mutableState => {
                action.data.comments.forEach( comment => {
                    // TODO [Future] Use arrays or mutable Sets to improve performance
                    let postComments = null;
                    if ( mutableState.has( comment.parentId ) ) {
                        postComments = mutableState.get( comment.parentId );
                    } else {
                        postComments = Immutable.Set();
                    }
                    postComments = postComments.add( comment.id );
                    mutableState.set( comment.parentId, postComments );
                } );
            } );
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
        case DOWNLOAD_ONE_COMMENT_COMPLETE:
            const comment = action.data;
            return state.set( comment.id, Immutable.fromJS( comment ) );
        default:
            return state;
    }
};
