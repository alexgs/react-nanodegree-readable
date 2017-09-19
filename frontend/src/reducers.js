import { combineReducers } from 'redux';
import categoriesReducer from './Categories/reducers';

// Import reducers from the different components, combine, and export

export default combineReducers( {
    categories: categoriesReducer
} );
