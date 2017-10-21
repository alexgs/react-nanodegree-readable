import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const metadataButtonStyle = {
    border: 'none',
    margin: 0,
    padding: 0,
    fontSize: 'inherit',
    color: 'inherit'
};


class MetadataButton extends PureComponent {
    static propTypes = {
        clickFunction: PropTypes.func.isRequired
    };

    render() {
        return (
            <button
                className="btn btn-link"
                style={ metadataButtonStyle }
                type="button"
                onClick={ this.props.clickFunction }
            >
                { this.props.children }
            </button>
        );
    }
}

export default MetadataButton;
