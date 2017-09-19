import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import EditPost from './Posts/EditPost';
import ListView from './Categories/ListView';
import NavBar from './NavBar/NavBar';
import PostDetail from './Posts/PostDetail';
import { downloadCategoriesStart } from './Categories/actions';

class App extends Component {
    componentDidMount() {
        this.props.dispatch( downloadCategoriesStart() );
    }

    render() {
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

export default connect( state => ({ categories: state.categories }) )( App );
