import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CategorySelector from './CategorySelector';
import TextInput from '../Shared/TextInput';

class PostForm extends PureComponent {
    static propTypes = {
        author: PropTypes.string,
        body: PropTypes.string,
        categories: ImmutablePropTypes.listOf( ImmutablePropTypes.mapContains( {
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
        } ) ),
        category: PropTypes.any,
        id: PropTypes.string,
        new: PropTypes.bool.isRequired,
        submitFunction: PropTypes.func.isRequired,
        title: PropTypes.string
    };

    constructor( props ) {
        super( props );
        this.state = this.getDefaultState();

        this.getDefaultState = this.getDefaultState.bind( this );
        this.handleAuthorInput = this.handleAuthorInput.bind( this );
        this.handleBodyInput = this.handleBodyInput.bind( this );
        this.handleCategoryChange = this.handleCategoryChange.bind( this );
        this.handleResetClick = this.handleResetClick.bind( this );
        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleTitleInput = this.handleTitleInput.bind( this );
    }

    getDefaultState() {
        return {
            author: this.props.author || '',
            body: this.props.body || '',
            category: this.props.category || '',
            id: this.props.id || '',
            title: this.props.title || ''
        };
    }

    handleAuthorInput( event ) {
        this.setState( { author: event.target.value } );
    }

    handleBodyInput( event ) {
        this.setState( { body: event.target.value } );
    }

    handleCategoryChange( event ) {
        this.setState( { category: event.target.value } );
    }

    handleResetClick( event ) {
        event.preventDefault();
        this.setState( this.getDefaultState() );
    }

    handleSubmit( event ) {
        event.preventDefault();

        // Gather correct data
        const commentData = this.props.new ? {
            // The following fields are needed for submitting a new post: author, body, category, title
            author: this.state.author,
            body: this.state.body,
            category: this.state.category,
            title: this.state.title
        } : {
            // The following fields are needed for editing an existing post: body, ID, title
            body: this.state.body,
            id: this.props.id,
            title: this.state.title
        };

        // Submit data; assume that the correct submit function was passed in
        this.props.submitFunction( commentData );

        // Reset form
        this.setState( this.getDefaultState() );
    }

    handleTitleInput( event ) {
        this.setState( { title: event.target.value } );
    }

    render() {
        const { author, body, category, title } = this.state;

        // Use anonymous closures to render fields on demand
        const fields = {
            author: () => <TextInput
                htmlId="post-author"
                label="Your Name"
                onChangeFunction={ this.handleAuthorInput }
                placeholder="Name"
                value={ author }
            />,
            body: () => <TextInput
                htmlId="post-body"
                label="Post Content"
                onChangeFunction={ this.handleBodyInput }
                placeholder="Something insightful and constructive..."
                value={ body }
            />,
            category: () => <CategorySelector
                categories={ this.props.categories }
                htmlId="post-category"
                onChangeFunction={ this.handleCategoryChange }
                value={ category }
            />,
            title: () => <TextInput
                htmlId="post-title"
                label="Title"
                onChangeFunction={ this.handleTitleInput }
                placeholder="Dazzle your audience!"
                value={ title }
            />
        };
        const buttons = (
            <div className="form-group">
                <div className="col-xs-12 text-right">
                    <button type="button" className="btn btn-default" onClick={ this.handleResetClick }>
                        Reset
                    </button>
                    &nbsp;&nbsp;
                    <button type="submit" className="btn btn-primary">Post</button>
                </div>
            </div>
        );

        if ( this.props.new ) {
            return (
                <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                    { fields.author() }
                    { fields.title() }
                    { fields.body() }
                    { fields.category() }
                    { buttons }
                </form>
            );
        } else {
            return (
                <form className="form-horizontal" onSubmit={ this.handleSubmit }>
                    { fields.title() }
                    { fields.body() }
                    { buttons }
                </form>
            );
        }
    }
}

export default PostForm;
