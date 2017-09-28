import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

const pageHeaderStyle = {
    color: 'initial'
};

const iconStyle = {
    color: 'maroon'
};

class PageHeader extends PureComponent {
    render() {
        return (
            <div className="page-header"><h1><Link to="/">
                <span style={ pageHeaderStyle }>
                    Readable <span style={ iconStyle } className="fa fa-newspaper-o" aria-hidden="true"/>&nbsp;
                    <small>Where the Internet can read stuff</small>
                </span>
            </Link></h1></div>
        );
    }
}

export default PageHeader;
