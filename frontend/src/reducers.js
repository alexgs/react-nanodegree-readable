import { combineReducers } from 'redux-immutable';
import { STORE_CATEGORIES, STORE_POSTS_BY_CATEGORY, STORE_POSTS_DATA } from './constants';
import categoriesReducer from './Categories/reducers';
import { postsByCategoryReducer, postsDataReducer } from './Posts/reducers';

// Import reducers from the different components, combine, and export

export default combineReducers( {
    [STORE_CATEGORIES]: categoriesReducer,
    [STORE_POSTS_BY_CATEGORY]: postsByCategoryReducer,
    [STORE_POSTS_DATA]: postsDataReducer
} );
