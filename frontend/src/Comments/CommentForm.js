import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const formLabelStyle = {
    fontSize: 14
};

class CommentForm extends PureComponent {
    static propTypes = {
        commentAuthor: PropTypes.string,
        commentBody: PropTypes.string,
        parentPostId: PropTypes.string.isRequired,
        submitCommentFunction: PropTypes.func.isRequired
    };

    constructor( props ) {
        super( props );
        this.state = {
            commentAuthor: props.commentAuthor || '',
            commentBody: props.commentBody || ''
        };

        this.handleAuthorInput = this.handleAuthorInput.bind( this );
        this.handleBodyInput = this.handleBodyInput.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    handleAuthorInput( event ) {
        this.setState( { commentAuthor: event.target.value } );
    }

    handleBodyInput( event ) {
        this.setState( { commentBody: event.target.value } );
    }

    handleSubmit( event ) {
        event.preventDefault();
        // Params: postId, author, body
        // console.log( `<<< ${this.props.parentPostId} | ${this.state.commentAuthor} | ${this.state.commentBody} >>>` );
        this.props.submitCommentFunction( this.props.parentPostId, this.state.commentAuthor, this.state.commentBody );
    }

    render() {
        const { commentAuthor, commentBody } = this.state;
        return (
            <div className="col-xs-8" style={ { marginTop: 0 } }>
                <h3>Add a comment</h3>
                <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label
                            className="col-xs-2 control-label"
                            style={ formLabelStyle }
                            htmlFor="comment-author-name"
                        >
                            Your name
                        </label>
                        <div className="col-xs-10">
                            <input
                                className="form-control"
                                id="comment-author-name"
                                onChange={ this.handleAuthorInput }
                                placeholder="Name"
                                type="text"
                                value={ commentAuthor }
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="col-xs-2 control-label"
                            style={ formLabelStyle }
                            htmlFor="comment-body"
                        >
                            Comment
                        </label>
                        <div className="col-xs-10">
                            <input
                                className="form-control"
                                id="comment-body"
                                onChange={ this.handleBodyInput }
                                placeholder="Something insightful and constructive..."
                                type="text"
                                value={ commentBody }
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12 text-right">
                            <button type="button" className="btn btn-default">Reset</button>
                            &nbsp;&nbsp;
                            <button type="submit" className="btn btn-primary">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CommentForm;
