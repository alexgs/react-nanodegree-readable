import _ from 'lodash';
import * as actions from './actions';

export const getCommentCount = function( commentsByPost, commentData, postId ) {
    const commentsLoaded = commentsByPost.size > 0;     // Assume at least one post with at least one comment
    if ( commentsLoaded && commentsByPost.has( postId ) ) {
        return commentsByPost.get( postId )
            .filter( commentId => {
                const data = commentData.get( commentId );
                return !data.get( 'deleted' );
            } )
            .size;
    } else {
        return 0;
    }
};

export const submitModifiedPost = function( postData, dispatch ) {
    // `postData` is an object with the following fields: body, ID, title
    const postDataSchema = {
        body: _.isString,
        id: _.isString,
        title: _.isString
    };
    if ( !_.conformsTo( postData, postDataSchema ) ) {
        throw new Error( `Illegal post data: ${ JSON.stringify( postData ) }` );
    }

    // const { id, title } = postData;
    // console.log( `--> ${id} | ${title} <--` );

    dispatch( actions.submitModifiedPost( postData ) );
};
