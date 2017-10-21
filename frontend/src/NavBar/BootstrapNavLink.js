import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

class BootstrapNavLink extends Component {
    static propTypes = {
        to: PropTypes.string.isRequired
    };

    render() {
        return (
            // TODO [Nice] Make the category active when viewing a post in that category
            <Route
                path={ this.props.to }
                children={ ({ location }) => {
                    const isActive = ( location.pathname === this.props.to );
                    return (
                        <li className={ isActive ? 'active' : null } >
                            <Link to={ this.props.to }>{ this.props.children }</Link>
                        </li>
                    );
                } }
            />
        );
    }
}

export default BootstrapNavLink;
