import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { downloadPostsStart } from '../Posts/actions';

class ListView extends Component {
    static propTypes = {
        category: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.props.dispatch( downloadPostsStart() );
    }

    render() {
        return <h2>List View for Category "{this.props.category}"</h2>
    }

}

export default connect(  state => ({ posts: state.posts }) )( ListView );
