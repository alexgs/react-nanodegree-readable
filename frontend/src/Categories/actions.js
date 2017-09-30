import { fetchCategories } from '../api';
import { thunkPromiseChainErrorHandler } from '../utils';
import { DOWNLOAD_CATEGORIES_COMPLETE, ERROR_SOURCE_API } from '../constants';

export const downloadCategoriesComplete = function( data ) {
    return {
        type: DOWNLOAD_CATEGORIES_COMPLETE,
        data
    }
};

export const downloadCategoriesStart = function() {
    return function( dispatch ) {
        return fetchCategories()
            .then( payload => dispatch( downloadCategoriesComplete( payload ) ) )
            .catch( thunkPromiseChainErrorHandler( ERROR_SOURCE_API ) );
    };
};
