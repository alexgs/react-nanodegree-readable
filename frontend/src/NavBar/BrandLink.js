import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

const activeStyle = {
    color: 'white'
};

class BrandLink extends Component {
    static propTypes = {
        to: PropTypes.string.isRequired
    };

    render() {
        return (
            <Route
                path={ this.props.to }
                children={ ({ location }) => {
                    const isActive = ( location.pathname === this.props.to );
                    return (
                        <Link
                            className="navbar-brand"
                            style={ isActive ? activeStyle : null }
                            to={ this.props.to }
                        >
                            { this.props.children }
                        </Link>
                    );
                } }
            />
        );
    }
}

export default BrandLink;
