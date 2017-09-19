import React, { PureComponent } from 'react';

class ListView extends PureComponent {
    render() {
        return <h2>List View for Category "{this.props.category}"</h2>
    }

}

export default ListView;
