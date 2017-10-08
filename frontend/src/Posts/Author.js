import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import MetadataBlock from './MetadataBlock';

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
            <MetadataBlock>
                Author: <span style={ nameStyle }>{ this.props.author }</span>
            </MetadataBlock>
        )
    }
}

export default PostAuthor;
