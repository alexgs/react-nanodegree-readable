import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import _ from 'lodash';
import { secondRowBlockStyle, summaryButtonStyle } from './PostSummary';

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
        downVoteFunction: PropTypes.func.isRequired,
        postId: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        upVoteFunction: PropTypes.func.isRequired
    };

    constructor( props ) {
        super( props );
        this.handleDownVoteClick = this.handleDownVoteClick.bind( this );
        this.handleUpVoteClick = this.handleUpVoteClick.bind( this );
    }

    handleDownVoteClick() {
        this.props.downVoteFunction( this.props.postId );
    }

    handleUpVoteClick() {
        this.props.upVoteFunction( this.props.postId );
    }

    render() {
        const { score } = this.props;
        let scoreStyle = defaultScoreStyle;
        if ( score < -2 ) {
            scoreStyle = _.merge( {}, defaultScoreStyle, lowScoreStyle );
        } else if ( score > 2 ) {
            scoreStyle = _.merge( {}, defaultScoreStyle, highScoreStyle );
        }       // else use default style
        return (
            <div style={ secondRowBlockStyle }>
                Score: <span style={ scoreStyle }>{ score }</span>
                &nbsp;
                <button
                    className="btn btn-link"
                    style={ summaryButtonStyle }
                    type="button"
                    onClick={ this.handleUpVoteClick }
                >
                    <span className="fa fa-thumbs-o-up" />
                </button>
                &nbsp;
                <button
                    className="btn btn-link"
                    style={ summaryButtonStyle }
                    type="button"
                    onClick={ this.handleDownVoteClick }
                >
                    <span className="fa fa-thumbs-o-down" />
                </button>
            </div>
        )
    }
}

export default PostScore;
