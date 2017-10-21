import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PostForm from './Form';

class NewPostContainer extends PureComponent {
    static propTypes = {
        categories: ImmutablePropTypes.listOf( ImmutablePropTypes.mapContains( {
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
        } ) ).isRequired,
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
