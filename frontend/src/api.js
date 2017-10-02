import _ from 'lodash';
import { AUTHORIZATION_KEY, ERROR_SOURCE_API } from './constants';

const HEADER_AUTHORIZATION = { 'Authorization': AUTHORIZATION_KEY };
const HEADER_CONTENT_JSON = { 'Content-Type': 'application/json' };

// --- PUBLIC API METHODS ---

export const fetchCategories = function () {
    return getWorker( '/categories' );
};

export const fetchComments = function( postId ) {
    return getWorker( '/posts/' + makeToken( 'postId') + '/comments', { postId } );
};

export const fetchPosts = function() {
    return getWorker( '/posts' );
};

export const sendPostUpVote = function( postId ) {
    const url = urlFactory( '/posts/' + makeToken( 'postId'), { postId } );
    const payload = { option: 'upVote' };
    const fetchOptions = {
        body: JSON.stringify( payload ),
        headers: _.merge( {}, HEADER_AUTHORIZATION, HEADER_CONTENT_JSON ),
        method: 'POST',
    };
    return fetch( url, fetchOptions )
        .then( response => {
            if ( response.ok ) {
                return response.json();
            } else {
                const error = new Error( `POST request to ${postId} returned status code ${response.status }` );
                error.source = ERROR_SOURCE_API;
                throw error;
            }
        } );
};

// --- PRIVATE UTILITY & HELPER FUNCTIONS ---

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
                const error = new Error( `Path ${path} returned status code ${response.status }` );
                error.source = ERROR_SOURCE_API;
                throw error;
            }
        } );
};

const makeToken = function( key ) {
    return '${' + key + '}';
};
