import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import CommentForm from './CommentForm';

class NewCommentContainer extends PureComponent {
    static propTypes = {
        parentId: PropTypes.string.isRequired,
        submitFunction: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className="col-xs-8" style={ { marginTop: 0 } }>
                <h3>Add a comment</h3>
                <CommentForm
                    parentId={ this.props.parentId }
                    submitFunction={ this.props.submitFunction }
                />
            </div>
        );
    }
}

export default NewCommentContainer;
