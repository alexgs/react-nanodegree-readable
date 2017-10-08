import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import BootstrapNavLink from './BootstrapNavLink';
import BrandLink from './BrandLink';

class NavBar extends Component {
    static propTypes = {
        categories: ImmutablePropTypes.listOf( ImmutablePropTypes.mapContains( {
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
        } ) ).isRequired
    };

    render() {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <BrandLink to="/">Readable</BrandLink>
                    </div>
                    <div id="navbar-main">
                        <ul className="nav navbar-nav">
                            { this.props.categories.map( category => {
                                const name = category.get( 'name' );
                                const path = category.get( 'path' );
                                return (
                                    <BootstrapNavLink key={ path } to={ `/${path}` }>{ name }</BootstrapNavLink>
                                );
                            } ) }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
