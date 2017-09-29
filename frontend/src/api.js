import _ from 'lodash';
import { AUTHORIZATION_KEY } from './constants';

export const fetchCategories = function () {
    return getWorker( '/categories' );
};

export const fetchPosts = function() {
    return getWorker( '/posts' );
};

const urlFactory = function( path, options={} ) {
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

    return 'http://localhost:3001' + path;
};

const getWorker = function( path, options={} ) {
    const url = urlFactory( path, options );
    return fetch( url, { headers: { 'Authorization': AUTHORIZATION_KEY } } )
        .then( response => {
            if ( response.ok ) {
                return response.json();
            } else {
                throw new Error( `Path ${path} returned status code ${response.status }` );
            }
        } );

};

const makeToken = function( key ) {
    return '${' + key + '}';
};
