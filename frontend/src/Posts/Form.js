import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const formLabelStyle = {
    fontSize: 14
};

// TODO Application has a form for creating a new post.
// TODO Submitting the form properly adds the post to the correct category.
class PostForm extends PureComponent {
    static propTypes = {
        author: PropTypes.string,
        body: PropTypes.string,
        categories: PropTypes.any.isRequired,
        category: PropTypes.any,
        id: PropTypes.string,
        new: PropTypes.bool.isRequired,
        submitFunction: PropTypes.func.isRequired,
        timestamp: PropTypes.number,
        title: PropTypes.string
    };

    constructor( props ) {
        super( props );
        this.state = this.getDefaultState();

        this.getDefaultState = this.getDefaultState.bind( this );
        this.handleBodyInput = this.handleBodyInput.bind( this );
    }

    getDefaultState() {
        return {
            author: this.props.author || '',
            body: this.props.body || '',
            category: this.props.category || '',
            id: this.props.id || '',
            timestamp: this.props.timestamp || '',
            title: this.props.title || ''
        };
    }

    handleBodyInput( event ) {
        this.setState( { body: event.target.value } );
    }

    // TODO Complete function
    handleSubmit( event ) {
        event.preventDefault();

        // Gather correct data
        const commentData = this.state.newComment ? {
            author: this.state.author,
            body: this.state.body,
            parentId: this.props.parentId
        } : {
            body: this.state.body,
            id: this.props.id,
            timestamp: this.props.timestamp
        };

        // Submit data
        this.props.submitFunction( commentData, this.state.newComment );

        // Reset form
        this.setState( this.getDefaultState() );
    }

    render() {
        const { author, body } = this.state;
        const newPost = this.props.new;

        return (
            <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <label
                        className="col-xs-2 control-label"
                        style={ formLabelStyle }
                        htmlFor="post-body"
                    >
                        Post Content:
                    </label>
                    <div className="col-xs-10">
                        <input
                            className="form-control"
                            id="post-body"
                            onChange={ this.handleBodyInput }
                            placeholder="Something insightful and constructive..."
                            type="text"
                            value={ body }
                        />
                    </div>
                </div>
            </form>
        );
    }
}

export default PostForm;
