import { combineReducers } from 'redux-immutable';
import categoriesReducer from './Categories/reducers';
import { commentsByPostReducer, commentsDataReducer, commentsEditReducer } from './Comments/reducers';
import { listViewSortModeReducer, postsByCategoryReducer, postsDataReducer, postsEditReducer } from './Posts/reducers';
import {
    STORE_CATEGORIES,
    STORE_COMMENTS_BY_POST,
    STORE_COMMENTS_DATA,
    STORE_EDIT_COMMENT,
    STORE_EDIT_POST,
    STORE_LIST_VIEW_SORT_MODE,
    STORE_POSTS_BY_CATEGORY,
    STORE_POSTS_DATA
} from './constants';

// Import reducers from the different components, combine, and export

export default combineReducers( {
    [STORE_CATEGORIES]: categoriesReducer,
    [STORE_COMMENTS_BY_POST]: commentsByPostReducer,
    [STORE_COMMENTS_DATA]: commentsDataReducer,
    [STORE_EDIT_COMMENT]: commentsEditReducer,
    [STORE_EDIT_POST]: postsEditReducer,
    [STORE_LIST_VIEW_SORT_MODE]: listViewSortModeReducer,
    [STORE_POSTS_BY_CATEGORY]: postsByCategoryReducer,
    [STORE_POSTS_DATA]: postsDataReducer
} );
