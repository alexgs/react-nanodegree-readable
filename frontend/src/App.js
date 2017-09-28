// Project rubric: https://review.udacity.com/#!/rubrics/1017/view

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import EditPost from './Posts/EditPost';
import ListView from './Categories/ListView';
import NavBar from './NavBar/NavBar';
import PostDetail from './Posts/PostDetail';
import { downloadCategoriesStart } from './Categories/actions';
import { STORE_CATEGORIES } from './constants';

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
        // TODO: Fix paths to match what is in the rubric
        return (
            <BrowserRouter>
                <div className="readable-app">
                    <NavBar categories={ this.props.categories } />
                    <div className="container">
                        <div className="page-header"><h1>Readable</h1></div>
                        <Route
                            path="/" exact
                            render={ () => ( <ListView category="all" /> ) }
                        />
                        <Route
                            path="/cat/:category"
                            render={ ({ match }) => ( <ListView category={ match.params.category } /> ) }
                        />
                        <Route
                            path="/post/:postId"
                            render={ ({ match }) => (
                                <div>
                                    <Route
                                        path={ match.url + '/edit' } exact
                                        render={ () => ( <EditPost id={ match.params.postId } /> ) }
                                    />
                                    <Route
                                        path={ match.url } exact
                                        render={ () => ( <PostDetail id={ match.params.postId } /> ) }
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
