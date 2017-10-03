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

export const sendPostDownVote = function( postId ) {
    const payload = { option: 'downVote' };
    return postWorker( '/posts/' + makeToken( 'postId' ), payload, { postId } );
};

export const sendPostUpVote = function( postId ) {
    const payload = { option: 'upVote' };
    return postWorker( '/posts/' + makeToken( 'postId' ), payload, { postId } );
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

const fetchWorker = function( path, urlOptions, fetchOptions={} ) {
    fetchOptions.headers = _.merge( {}, HEADER_AUTHORIZATION, fetchOptions.headers );
    const url = urlFactory( path, urlOptions );
    return fetch( url, fetchOptions )
        .then( response => {
            if ( response.ok ) {
                return response.json();
            } else {
                const method = fetchOptions.method ? _.toUpper( fetchOptions.method ) : 'GET';
                const error = new Error( `${method} request to ${url} returned status code ${response.status }` );
                error.source = ERROR_SOURCE_API;
                throw error;
            }
        } );
};

const getWorker = function( path, urlOptions={} ) {
    return fetchWorker( path, urlOptions );
};

const postWorker = function( path, payload, urlOptions={} ) {
    const fetchOptions = {
        body: JSON.stringify( payload ),
        headers: HEADER_CONTENT_JSON,
        method: 'POST',
    };
    return fetchWorker( path, urlOptions, fetchOptions );
};

const makeToken = function( key ) {
    return '${' + key + '}';
};
