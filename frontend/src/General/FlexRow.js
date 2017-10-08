// import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const flexRowStyle = {
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
};

class FlexRow extends PureComponent {
    render() {
        return (
            <div className="col-xs-12" style={ flexRowStyle }>
                { this.props.children }
            </div>
        );
    }
}

export default FlexRow;
