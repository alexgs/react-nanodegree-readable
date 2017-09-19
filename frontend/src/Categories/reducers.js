import { DOWNLOAD_CATEGORIES_COMPLETE } from '../constants';

const categoriesReducer = function( state=[], action ) {
    switch( action.type ) {
        case DOWNLOAD_CATEGORIES_COMPLETE:
            return action.data.categories;
        default:
            return state;
    }
};

export default categoriesReducer;
