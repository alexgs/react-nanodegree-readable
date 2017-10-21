import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';

const nameStyle = {
    color: 'maroon',
    fontVariant: 'small-caps'
};

class EditCommentContainer extends PureComponent {
    static propTypes = {
        author: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        submitFunction: PropTypes.func.isRequired,
        timestamp: PropTypes.number.isRequired
    };

    render() {
        return (
            <div>
                <h3>Edit <span style={ nameStyle }>{ this.props.author }</span>'s comment</h3>
                <CommentForm
                    body={ this.props.body }
                    id={ this.props.id }
                    submitFunction={ this.props.submitFunction }
                    timestamp={ this.props.timestamp }
                />
            </div>
        );
    }
}

export default EditCommentContainer;
