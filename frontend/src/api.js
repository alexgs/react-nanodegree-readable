import _ from 'lodash';
import { AUTHORIZATION_KEY, ERROR_SOURCE_API } from './constants';

const HEADER_AUTHORIZATION = { 'Authorization': AUTHORIZATION_KEY };
const HEADER_CONTENT_JSON = { 'Content-Type': 'application/json' };

// --- PUBLIC API METHODS ---

export const deleteComment = function( commentId ) {
    const urlPath = '/comments/' + makeToken( 'commentId' );
    const urlOptions = { commentId };
    const requestOptions = {
        method: 'DELETE',
    };
    return requestWorker( urlPath, urlOptions, requestOptions );
};

export const deletePost = function( postId ) {
    const urlPath = '/posts/' + makeToken( 'postId' );
    const urlOptions = { postId };
    const requestOptions = {
        method: 'DELETE',
    };
    return requestWorker( urlPath, urlOptions, requestOptions );
};

export const fetchCategories = function () {
    return getWorker( '/categories' );
};

export const fetchComments = function( postId ) {
    return getWorker( '/posts/' + makeToken( 'postId') + '/comments', { postId } );
};

export const fetchPosts = function() {
    return getWorker( '/posts' );
};

export const sendCommentDownVote = function( commentId ) {
    const payload = { option: 'downVote' };
    return postWorker( '/comments/' + makeToken( 'commentId' ), payload, { commentId } );
};

export const sendCommentUpVote = function( commentId ) {
    const payload = { option: 'upVote' };
    return postWorker( '/comments/' + makeToken( 'commentId' ), payload, { commentId } );
};

export const sendNewComment = function( commentData ) {
    // commentData is an object with the following fields: author, body, id, parentId, timestamp
    return postWorker( '/comments', commentData );
};

export const sendNewPost = function( postData ) {
    return postWorker( '/posts', postData );
};

export const sendPostDownVote = function( postId ) {
    const payload = { option: 'downVote' };
    return postWorker( '/posts/' + makeToken( 'postId' ), payload, { postId } );
};

export const sendPostUpVote = function( postId ) {
    const payload = { option: 'upVote' };
    return postWorker( '/posts/' + makeToken( 'postId' ), payload, { postId } );
};

export const sendUpdatedComment = function( commentData, commentId ) {
    // commentData is an object with the following fields: body, timestamp
    const urlPath = '/comments/' + makeToken( 'commentId' );
    const urlOptions = { commentId };
    const requestOptions = {
        body: JSON.stringify( commentData ),
        headers: HEADER_CONTENT_JSON,
        method: 'PUT',
    };
    return requestWorker( urlPath, urlOptions, requestOptions );
};

// --- PRIVATE UTILITY & HELPER FUNCTIONS ---

const getWorker = function( path, urlOptions={} ) {
    return requestWorker( path, urlOptions );
};

const makeToken = function( key ) {
    return '${' + key + '}';
};

const postWorker = function( path, payload, urlOptions={} ) {
    const requestOptions = {
        body: JSON.stringify( payload ),
        headers: HEADER_CONTENT_JSON,
        method: 'POST',
    };
    return requestWorker( path, urlOptions, requestOptions );
};

const requestWorker = function( path, urlOptions, requestOptions={} ) {
    requestOptions.headers = _.merge( {}, HEADER_AUTHORIZATION, requestOptions.headers );
    const url = urlFactory( path, urlOptions );
    return fetch( url, requestOptions )
        .then( response => {
            if ( response.ok ) {
                return response.json();
            } else {
                const method = requestOptions.method ? _.toUpper( requestOptions.method ) : 'GET';
                const error = new Error( `${method} request to ${url} returned status code ${response.status}` );
                error.source = ERROR_SOURCE_API;
                throw error;
            }
        } );
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
