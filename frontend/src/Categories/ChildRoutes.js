import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';
import DetailView from '../Posts/DetailView';
import ListView from '../Posts/ListView';

class ChildRoutes extends PureComponent {
    static propTypes = {
        parentMatch: PropTypes.object.isRequired
    };

    render() {
        const { parentMatch } = this.props;
        const parentUrl = parentMatch.url;
        const category = parentMatch.params.category;
        return (
            <div>
                <Route
                    path={ parentUrl + '/:postId' } exact
                    render={ ({ match }) => ( <DetailView postId={ match.params.postId } /> ) }
                />
                <Route
                    path={ parentUrl } exact
                    render={ () => ( <ListView category={ category } /> ) }
                />
            </div>
        );
    }
}

export default ChildRoutes;
