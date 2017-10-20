import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';

class EditCommentContainer extends PureComponent {
    static propTypes = {
        author: PropTypes.string,
        body: PropTypes.string,
        parentPostId: PropTypes.string.isRequired,
        submitFunction: PropTypes.func.isRequired
    };

    render() {
        return (
            <div>
                <h3>Edit comment</h3>
                <CommentForm
                    author={ this.props.author }
                    body={ this.props.body }
                    parentPostId={ this.props.parentPostId }
                    submitFunction={ this.props.submitFunction }
                />
            </div>
        );
    }
}

export default EditCommentContainer;
