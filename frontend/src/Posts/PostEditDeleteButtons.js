import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { secondRowBlockStyle } from './PostSummary';

class PostEditDeleteButtons extends PureComponent {
    static propTypes = {};

    render() {
        return (
            <div style={ secondRowBlockStyle }>
                <span className="fa fa-pencil" />
                &nbsp;&nbsp;<span className="fa fa-trash-o" />
            </div>
        );
    }
}

export default PostEditDeleteButtons;
