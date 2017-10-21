import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import PostForm from './Form';

class NewPostContainer extends PureComponent {
    static propTypes = {
        categories: PropTypes.any.isRequired,
        submitFunction: PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <h3>Add a new post</h3>
                <PostForm
                    categories={ this.props.categories }
                    new={ true }
                    submitFunction={ this.props.submitFunction }
                />
            </div>
        );
    }
}

export default NewPostContainer;
