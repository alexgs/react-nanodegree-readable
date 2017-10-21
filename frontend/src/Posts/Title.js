import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const defaultTitleStyle = {
    margin: '0 1em 0 0',
    whiteSpace: 'nowrap'
};

class Title extends PureComponent {
    static propTypes = {
        category: PropTypes.string.isRequired,
        postId: PropTypes.string.isRequired,
        style: PropTypes.object,
        title: PropTypes.string.isRequired
    };

    render() {
        const { category, postId, style, title } = this.props;
        const titleStyle = _.merge( {}, defaultTitleStyle, style );
        return (
            <Link to={ `/${category}/${postId}` } style={{ color: 'inherit' }}>
                <h3 style={ titleStyle }>{ title }</h3>
            </Link>
        );
    }
}

export default Title;
