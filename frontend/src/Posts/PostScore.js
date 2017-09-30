import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { secondRowBlockStyle } from './PostSummary';

class PostScore extends PureComponent {
    static propTypes = {
        score: PropTypes.number.isRequired
    };

    render() {

        return (
            <div style={ secondRowBlockStyle }>score: { this.props.score }</div>
        )
    }
}

export default PostScore;
