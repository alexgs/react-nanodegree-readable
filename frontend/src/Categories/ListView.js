import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { downloadPostsStart } from '../Posts/actions';
import { STORE_POSTS_BY_CATEGORY, STORE_POSTS_DATA } from '../constants';

// TODO Does this update correctly as a `PureComponent`?
class ListView extends Component {
    static propTypes = {
        category: PropTypes.string.isRequired,
        [STORE_POSTS_BY_CATEGORY]: ImmutablePropTypes.mapOf(
            ImmutablePropTypes.setOf( PropTypes.string )
        ).isRequired,
        [STORE_POSTS_DATA]: ImmutablePropTypes.mapContains( {
            author: PropTypes.string,
            body: PropTypes.string,
            category: PropTypes.string,
            deleted: PropTypes.bool,
            id: PropTypes.string,
            timestamp: PropTypes.number,
            title: PropTypes.string,
            voteScore: PropTypes.number
        } ).isRequired
    };

    componentDidMount() {
        this.props.dispatch( downloadPostsStart() );
    }

    render() {
        return <h2>List View for Category "{this.props.category}"</h2>
    }

}

export default connect( state => ({
    [STORE_POSTS_BY_CATEGORY]: state.get( STORE_POSTS_BY_CATEGORY ),
    [STORE_POSTS_DATA]: state.get( STORE_POSTS_DATA )
}) )( ListView );
