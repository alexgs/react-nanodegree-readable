import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import EditPost from './Posts/EditPost';
import ListView from './Categories/ListView';
import PostDetail from './Posts/PostDetail';
import { downloadCategoriesStart } from './Categories/actions';

class App extends Component {
    componentDidMount() {
        this.props.dispatch( downloadCategoriesStart() );
    }

    render() {
        return (
            <div className="readable-app">
                <Route
                    path='/' exact
                    render={ ( { match } ) => (
                        <ListView
                            category='all'
                        />
                    ) }
                />
                <Route
                    path='/cat/:category'
                    render={ ({ match }) => (
                        <ListView
                            category={ match.params.category }
                        />
                    ) }
                />
                <Route
                    path='/post/:postId'
                    render={ ({ match }) => (
                        <div>
                            <Route
                                path={match.url + '/edit'} exact
                                render={ () => (
                                    <EditPost
                                        id={ match.params.postId }
                                    />
                                ) }
                            />
                            <Route
                                path={ match.url } exact
                                render={ () => (
                                    <PostDetail
                                        id={ match.params.postId }
                                    />
                                ) }
                            />
                        </div>
                    ) }
                />
            </div>
        );
    }
}

export default connect()( App );
