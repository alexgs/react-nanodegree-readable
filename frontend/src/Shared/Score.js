import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import _ from 'lodash';
import MetadataBlock from './MetadataBlock';
import MetadataButton from './MetadataButton';

const defaultScoreStyle = {
    fontWeight: 'bold'
};

const highScoreStyle = {
    color: 'maroon'
};

const lowScoreStyle = {
    color: 'lightgrey'
};

class Score extends PureComponent {
    static propTypes = {
        downVoteFunction: PropTypes.func.isRequired,
        score: PropTypes.number.isRequired,
        targetId: PropTypes.string.isRequired,
        upVoteFunction: PropTypes.func.isRequired
    };

    constructor( props ) {
        super( props );
        this.handleDownVoteClick = this.handleDownVoteClick.bind( this );
        this.handleUpVoteClick = this.handleUpVoteClick.bind( this );
    }

    handleDownVoteClick() {
        this.props.downVoteFunction( this.props.targetId );
    }

    handleUpVoteClick() {
        this.props.upVoteFunction( this.props.targetId );
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
            <MetadataBlock>
                Score: <span style={ scoreStyle }>{ score }</span>
                &nbsp;
                <MetadataButton clickFunction={ this.handleUpVoteClick }>
                    <span className="fa fa-thumbs-o-up" />
                </MetadataButton>
                &nbsp;
                <MetadataButton clickFunction={ this.handleDownVoteClick }>
                    <span className="fa fa-thumbs-o-down" />
                </MetadataButton>
            </MetadataBlock>
        )
    }
}

export default Score;
