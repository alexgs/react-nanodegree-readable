import Immutable from 'immutable';
import store from '../store';
import { downloadCommentsStart } from '../Comments/actions';
import {
    DOWNLOAD_POSTS_COMPLETE,
    POST_DELETE_COMPLETE,
    POST_START_EDIT,
    POST_SUBMIT_MODIFIED_COMPLETE,
    POST_SUBMIT_NEW_COMPLETE,
    POST_VOTE_COMPLETE
} from '../constants';

const postsByCategoryDefaultState = Immutable.Map();
const postsDataDefaultState = Immutable.Map();

export const postsByCategoryReducer = function( state=postsByCategoryDefaultState, action ) {
    switch( action.type ) {
        case DOWNLOAD_POSTS_COMPLETE:
            return state.withMutations( mutableState => {
                action.data.posts.forEach( post => {
                    // TODO [Future] Use arrays or mutable Sets to improve performance
                    let categoryPosts = mutableState.get( post.category ) || Immutable.Set();
                    categoryPosts = categoryPosts.add( post.id );
                    mutableState.set( post.category, categoryPosts );
                } );
            } );
        case POST_SUBMIT_NEW_COMPLETE:
            const postData = action.data;
            let categoryPosts = state.get( postData.category ) || Immutable.Set();
            categoryPosts = categoryPosts.add( postData.id );
            return state.set( postData.category, categoryPosts );
        default:
            return state;
    }
};

export const postsDataReducer = function( state=postsDataDefaultState, action ) {
    switch( action.type ) {
        case DOWNLOAD_POSTS_COMPLETE:
            return state.withMutations( mutableState => {
                action.data.posts.forEach( post => {
                    mutableState.set( post.id, Immutable.fromJS( post ) );          // Add or update post data
                    store.dispatch( downloadCommentsStart( post.id ) );
                } );
            } );
        case POST_DELETE_COMPLETE:              // fall-through
        case POST_SUBMIT_MODIFIED_COMPLETE:     // fall-through
        case POST_SUBMIT_NEW_COMPLETE:          // fall-through
        case POST_VOTE_COMPLETE:
            const post = action.data;
            return state.set( post.id, Immutable.fromJS( post ) );
        default:
            return state;
    }
};

export const postsEditReducer = function( state=null, action ) {
    switch ( action.type ) {
        case POST_START_EDIT:
            return action.data;
        case POST_SUBMIT_MODIFIED_COMPLETE:
            return null;
        default:
            return state;
    }
};
