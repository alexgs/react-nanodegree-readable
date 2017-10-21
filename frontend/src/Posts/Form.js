import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import TextInput from '../Shared/TextInput';

const formLabelStyle = {
    fontSize: 14
};

// TODO Application has a form for creating a new post.
// TODO Submitting the form properly adds the post to the correct category.
class PostForm extends PureComponent {
    static propTypes = {
        author: PropTypes.string,
        body: PropTypes.string,
        categories: ImmutablePropTypes.listOf( ImmutablePropTypes.mapContains( {
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
        } ) ).isRequired,
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
        this.handleAuthorInput = this.handleAuthorInput.bind( this );
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

    handleAuthorInput( event ) {
        this.setState( { author: event.target.value } );
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

        // The following fields are needed for editing an existing post: body, ID, title
        // The following fields are needed for submitting a new post: author, body, category, title
        return (
            <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                <TextInput
                    htmlId="post-author"
                    label="Your Name"
                    onChangeFunction={ this.handleAuthorInput }
                    placeholder="Name"
                    value={ author }
                />
                <TextInput
                    htmlId="post-body"
                    label="Post Content"
                    onChangeFunction={ this.handleBodyInput }
                    placeholder="Something insightful and constructive..."
                    value={ body }
                />
            </form>
        );
    }
}

export default PostForm;
