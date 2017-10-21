import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './PageHeader.css';

const pageHeaderStyle = {
    color: 'initial'
};

const iconStyle = {
    color: 'maroon'
};

class PageHeader extends PureComponent {
    render() {
        return (
            <div className="row"><div className="col-xs-12"><div className="page-header">
                <h1><Link to="/">
                    <span style={ pageHeaderStyle }>
                        Readable <span style={ iconStyle } className="fa fa-newspaper-o" aria-hidden="true"/>&nbsp;
                        <small>Where the Internet can read stuff</small>
                    </span>
                </Link></h1>
            </div></div></div>
        );
    }
}

export default PageHeader;
