import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import _ from 'lodash';
import { secondRowBlockStyle } from './PostSummary';

const defaultScoreStyle = {
    fontWeight: 'bold'
};

const highScoreStyle = {
    color: 'maroon'
};

const lowScoreStyle = {
    color: 'lightgrey'
};

class PostScore extends PureComponent {
    static propTypes = {
        score: PropTypes.number.isRequired
    };

    render() {
        const score = this.props.score;
        let scoreStyle = defaultScoreStyle;
        if ( score < -2 ) {
            scoreStyle = _.merge( {}, defaultScoreStyle, lowScoreStyle );
        } else if ( score > 2 ) {
            scoreStyle = _.merge( {}, defaultScoreStyle, highScoreStyle );
        }       // else use default style
        return (
            <div style={ secondRowBlockStyle }>
                Score: <span style={ scoreStyle }>{ score }</span>
                &nbsp;<span className="fa fa-thumbs-o-up" />
                &nbsp;<span className="fa fa-thumbs-o-down" />
            </div>
        )
    }
}

export default PostScore;
