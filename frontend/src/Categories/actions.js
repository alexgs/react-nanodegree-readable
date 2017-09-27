import { DOWNLOAD_CATEGORIES_COMPLETE } from '../constants';
import { fetchCategories } from '../api';

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
            .catch( error => console.log( `>>> ERROR: ${error} <<<` ) );
    };
};
