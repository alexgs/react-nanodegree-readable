import { AUTHORIZATION_KEY } from './constants';

export const fetchCategories = function () {
    return fetch( 'http://localhost:3001/categories', { headers: { 'Authorization': AUTHORIZATION_KEY } } )
        .then( response => {
            if ( response.ok ) {
                return response.json();
            } else {
                throw new Error( `Status Code ${response.status }`)
            }
        } );
};

export const fetchPosts = function() {
    return fetch( 'http://localhost:3001/posts', { headers: { 'Authorization': AUTHORIZATION_KEY } } )
        .then( response => {
            if ( response.ok ) {
                return response.json();
            } else {
                throw new Error( `Status Code ${response.status }`)
            }
        } );
};
