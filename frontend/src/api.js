import _ from 'lodash';
import { AUTHORIZATION_KEY } from './constants';

export const fetchCategories = function () {
    return fetcher( '/categories' )
        .then( response => {
            if ( response.ok ) {
                return response.json();
            } else {
                throw new Error( `Status Code ${response.status }`)
            }
        } );
};

export const fetchPosts = function() {
    return fetcher( '/posts' )
        .then( response => {
            if ( response.ok ) {
                return response.json();
            } else {
                throw new Error( `Status Code ${response.status }`)
            }
        } );
};

const fetcher = function( path, options={} ) {
    if ( !path.startsWith('/') ) {
        throw new Error( 'Path must start with forward-slash' );
    }
    _.forEach( Object.keys( options ), key => {
        const token = makeToken( key );
        if ( !path.includes( token ) ) {
            throw new Error( 'Path must include token ' + token );
        }
    } );

    // Replace tokens in path with values from `option` argument
    _.forOwn( options, ( value, key ) => {
        const token = makeToken( key );
        path = _.replace( path, token, value );
    } );

    const url = 'http://localhost:3001' + path;
    return fetch( url, { headers: { 'Authorization': AUTHORIZATION_KEY } } );
};

const makeToken = function( key ) {
    return '${' + key + '}';
};
