import Immutable from 'immutable';
import { DOWNLOAD_POSTS_COMPLETE } from '../constants';

const postsDataDefaultState = Immutable.List();
const postsByCategoryDefaultState = Immutable.List();

export const postsByCategoryReducer = function( state=postsByCategoryDefaultState, action ) {
    switch( action.type ) {
        case DOWNLOAD_POSTS_COMPLETE:
            // TODO process a list of posts
            return action.data.posts ? Immutable.fromJS( action.data.posts ) : postsDataDefaultState;
        default:
            return state;
    }
};

export const postsDataReducer = function( state=postsDataDefaultState, action ) {
    switch( action.type ) {
        case DOWNLOAD_POSTS_COMPLETE:
            // TODO process a list of posts
            return action.data.posts ? Immutable.fromJS( action.data.posts ) : postsDataDefaultState;
        default:
            return state;
    }
};
