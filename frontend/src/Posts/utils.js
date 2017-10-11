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
