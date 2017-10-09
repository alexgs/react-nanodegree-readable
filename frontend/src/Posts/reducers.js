import Immutable from 'immutable';
import store from '../store';
import { downloadCommentsStart } from '../Comments/actions';
import { DOWNLOAD_POSTS_COMPLETE, POST_DELETE_COMPLETE, POST_VOTE_COMPLETE } from '../constants';

const postsByCategoryDefaultState = Immutable.Map();
const postsDataDefaultState = Immutable.Map();

export const postsByCategoryReducer = function( state=postsByCategoryDefaultState, action ) {
    switch( action.type ) {
        case DOWNLOAD_POSTS_COMPLETE:
            return state.withMutations( mutableState => {
                action.data.posts.forEach( post => {
                    // TODO [Future] Use arrays or mutable Sets to improve performance
                    let categoryPosts = null;
                    if ( mutableState.has( post.category ) ) {
                        categoryPosts = mutableState.get( post.category );
                    } else {
                        categoryPosts = Immutable.Set();
                    }
                    categoryPosts = categoryPosts.add( post.id );
                    mutableState.set( post.category, categoryPosts );
                } );
            } );
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
        case POST_DELETE_COMPLETE:      // Fall-through
        case POST_VOTE_COMPLETE:
            const post = action.data;
            return state.set( post.id, Immutable.fromJS( post ) );
        default:
            return state;
    }
};
