import { combineReducers } from 'redux-immutable';
import categoriesReducer from './Categories/reducers';
import { postsByCategoryReducer, postsDataReducer } from './Posts/reducers';

// Import reducers from the different components, combine, and export

export default combineReducers( {
    categories: categoriesReducer,
    postsByCategory: postsByCategoryReducer,
    postsData: postsDataReducer
} );
