import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';

class EditCommentContainer extends PureComponent {
    static propTypes = {
        author: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        parentId: PropTypes.string.isRequired,
        submitFunction: PropTypes.func.isRequired,
        timestamp: PropTypes.number.isRequired
    };

    render() {
        return (
            <div>
                <h3>Edit comment</h3>
                <CommentForm
                    author={ this.props.author }
                    body={ this.props.body }
                    id={ this.props.id }
                    parentId={ this.props.parentId }
                    submitFunction={ this.props.submitFunction }
                    timestamp={ this.props.timestamp }
                />
            </div>
        );
    }
}

export default EditCommentContainer;
