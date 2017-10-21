import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const authorParaStyle = {
    borderTop: '1px solid #eee',
    margin: 0,
    paddingTop: 5
};

const nameStyle = {
    color: 'maroon',
    fontVariant: 'small-caps'
};

class Author extends PureComponent {
    static propTypes = {
        author: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="col-xs-12">
                <p style={ authorParaStyle}>
                    <span style={ nameStyle }>{ this.props.author }</span> commented:
                </p>
            </div>

        )
    }
}

export default Author;
