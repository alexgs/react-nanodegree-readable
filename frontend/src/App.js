// Project rubric: https://review.udacity.com/#!/rubrics/1017/view

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import EditPost from './Posts/EditPost';
import ListView from './Posts/ListView';
import NavBar from './NavBar/NavBar';
import PostDetail from './Posts/Detail';
import { downloadCategoriesStart } from './Categories/actions';
import PageHeader from './General/PageHeader';
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
                            render={ ({ match }) => (
                                <div>
                                    <Route
                                        path={ match.url + '/:postId' } exact
                                        render={ ( props ) => ( <PostDetail postId={ props.match.params.postId } /> ) }
                                    />
                                    <Route
                                        path={ match.url } exact
                                        render={ () => ( <ListView category={ match.params.category } /> ) }
                                    />
                                </div>
                            ) }
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default connect( state => ({ categories: state.get( STORE_CATEGORIES ) }) )( App );
