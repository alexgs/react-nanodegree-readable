import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import MetadataBlock from '../Shared/MetadataBlock';

const stackStyle = {
    fontSize: '50%',
    marginLeft: 5,
    verticalAlign: 'inherit'
};

class CommentData extends PureComponent {
    static propTypes = {
        commentCount: PropTypes.number.isRequired
    };

    render() {
        return (
            <MetadataBlock>Comments: { this.props.commentCount }
                <span className="fa-stack" style={ stackStyle }>
                    <span className="fa fa-comment-o fa-stack-2x" />
                    <span className="fa fa-plus fa-stack-1x" />
                </span>
            </MetadataBlock>
        );
    }
}

export default CommentData;
