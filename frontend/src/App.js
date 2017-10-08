// Project rubric: https://review.udacity.com/#!/rubrics/1017/view

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { downloadCategoriesStart } from './Categories/actions';
import CategoryRoutes from './Categories/ChildRoutes';
import PageHeader from './General/PageHeader';
import NavBar from './NavBar/NavBar';
import ListView from './Posts/ListView';
import { CATEGORY_ALL, STORE_CATEGORIES } from './constants';

class App extends Component {
    static propTypes = {
        categories: ImmutablePropTypes.listOf( ImmutablePropTypes.mapContains( {
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
        } ) ).isRequired
    };

    componentDidMount() {
        this.props.dispatch( downloadCategoriesStart() );
    }

    render() {
        return (
            <BrowserRouter>
                <div className="readable-app">
                    <NavBar categories={ this.props.categories } />
                    <div className="container">
                        <PageHeader />
                        <Route
                            path="/" exact
                            render={ () => ( <ListView category={ CATEGORY_ALL } /> ) }
                        />
                        <Route
                            path="/:category"
                            render={ ({ match }) => <CategoryRoutes parentMatch={ match } /> }
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = function( state ) {
    return {
        categories: state.get( STORE_CATEGORIES )
    };
};

export default connect( mapStateToProps )( App );
