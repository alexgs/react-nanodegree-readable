import { DOWNLOAD_POSTS_COMPLETE } from '../constants';

const defaultState = [];

const postsReducer = function(state=defaultState, action ) {
    switch( action.type ) {
        case DOWNLOAD_POSTS_COMPLETE:
            return action.data.posts ? action.data.posts : defaultState;
        default:
            return state;
    }
};

export default postsReducer;
