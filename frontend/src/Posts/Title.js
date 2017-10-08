import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

const titleStyle = {
    margin: '0 1em 0 0',
    whiteSpace: 'nowrap'
};

class Title extends PureComponent {
    static propTypes = {
        category: PropTypes.string.isRequired,
        postId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    };

    render() {
        const { category, postId, title } = this.props;
        return (
            <Link to={ `/${category}/${postId}` } style={{ color: 'inherit' }}>
                <h3 style={ titleStyle }>{ title }</h3>
            </Link>
        );
    }
}

export default Title;
