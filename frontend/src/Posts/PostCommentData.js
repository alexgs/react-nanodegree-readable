import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { secondRowBlockStyle } from './PostSummary';

const stackStyle = {
    fontSize: '50%',
    marginLeft: 5,
    verticalAlign: 'inherit'
};

class PostCommentData extends PureComponent {
    static propTypes = {
        commentCount: PropTypes.number.isRequired
    };

    render() {
        return (
            <div style={ secondRowBlockStyle }>Comments: { this.props.commentCount }
                <span className="fa-stack" style={ stackStyle }>
                    <span className="fa fa-comment-o fa-stack-2x" />
                    <span className="fa fa-plus fa-stack-1x" />
                </span>
            </div>
        );
    }
}

export default PostCommentData;
