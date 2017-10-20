import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';

class NewCommentContainer extends PureComponent {
    static propTypes = {
        parentPostId: PropTypes.string.isRequired,
        submitFunction: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="col-xs-8" style={ { marginTop: 0 } }>
                <h3>Add a comment</h3>
                <CommentForm
                    parentPostId={ this.props.parentPostId }
                    submitFunction={ this.props.submitFunction }
                />
            </div>
        );
    }
}

export default NewCommentContainer;
