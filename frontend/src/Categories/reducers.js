import Immutable from 'immutable';
import { DOWNLOAD_CATEGORIES_COMPLETE } from '../constants';

const defaultState = Immutable.List();

const categoriesReducer = function( state=defaultState, action ) {
    switch( action.type ) {
        case DOWNLOAD_CATEGORIES_COMPLETE:
            return Immutable.List( action.data.categories );
        default:
            return state;
    }
};

export default categoriesReducer;
