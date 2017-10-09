import React, { PureComponent } from 'react';

export const metadataBlockStyle = {
    marginLeft: 0,
    marginRight: 10
};

class MetadataBlock extends PureComponent {
    render() {
        return (
            <div style={ metadataBlockStyle }>
                { this.props.children }
            </div>
        );
    }
}

export default MetadataBlock;
