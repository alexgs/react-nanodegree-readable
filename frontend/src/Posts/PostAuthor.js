import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { secondRowBlockStyle } from './PostSummary';

const nameStyle = {
    color: 'maroon',
    fontSize: '90%',
    fontWeight: 'bold',
    textTransform: 'uppercase'
};

class PostAuthor extends PureComponent {
    static propTypes = {
        author: PropTypes.string.isRequired
    };

    render() {
        return (
            <div style={ secondRowBlockStyle }>
                Author: <span style={ nameStyle }>{ this.props.author }</span>
            </div>
        )
    }
}

export default PostAuthor;
