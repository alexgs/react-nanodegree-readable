import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import PostForm from './Form';

class EditPostContainer extends PureComponent {
    static propTypes = {
        body: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        submitFunction: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired
    };

    render() {
        return <PostForm
            body={ this.props.body }
            id={ this.props.id }
            new={ false }
            submitFunction={ this.props.submitFunction }
            title={ this.props.title }
        />
    }
}

export default EditPostContainer;
