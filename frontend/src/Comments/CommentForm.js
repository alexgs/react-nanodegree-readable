import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const formLabelStyle = {
    fontSize: 14
};

class CommentForm extends PureComponent {
    static propTypes = {
        author: PropTypes.string,
        body: PropTypes.string,
        id: PropTypes.string,
        parentId: PropTypes.string,
        submitFunction: PropTypes.func.isRequired,
        timestamp: PropTypes.number
    };

    constructor( props ) {
        super( props );
        this.state = this.getDefaultState();

        this.getDefaultState = this.getDefaultState.bind( this );
        this.handleAuthorInput = this.handleAuthorInput.bind( this );
        this.handleBodyInput = this.handleBodyInput.bind( this );
        this.handleResetClick = this.handleResetClick.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
    }

    getDefaultState() {
        return {
            author: this.props.author || '',
            body: this.props.body || '',
            newComment: !this.props.id       // If an ID was passed in as props, assume we are editing an existing comment
        }
    }

    handleAuthorInput( event ) {
        this.setState( { author: event.target.value } );
    }

    handleBodyInput( event ) {
        this.setState( { body: event.target.value } );
    }

    handleResetClick( event ) {
        event.preventDefault();
        this.setState( this.getDefaultState() );
    }

    handleSubmit( event ) {
        event.preventDefault();
        const commentData = this.state.newComment ? {
            author: this.state.author,
            body: this.state.body,
            parentId: this.props.parentId
        } : {
            body: this.state.body,
            id: this.props.id,
            timestamp: this.props.timestamp
        };
        this.props.submitFunction( commentData, this.state.newComment );
        this.setState( this.getDefaultState() );
    }

    render() {
        // TODO [Nice] Refactor to use '../Shared/TextInput' components
        const { author, body, newComment } = this.state;
        const authorField = newComment ? (
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
                        value={ author }
                    />
                </div>
            </div>
        ) : null;

        return (
            <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                { authorField }
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
                            value={ body }
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-12 text-right">
                        <button type="button" className="btn btn-default" onClick={ this.handleResetClick }>
                            Reset
                        </button>
                        &nbsp;&nbsp;
                        <button type="submit" className="btn btn-primary">Post</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default CommentForm;
