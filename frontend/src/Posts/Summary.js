import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Author from './Author';
import CommentData from './CommentData';
import EditDeleteButtons from './EditDeleteButtons';
import Score from './Score';

// TODO (1) Listed posts are displayed with ... (f) buttons or links for editing ... the post

export const secondRowBlockStyle = {
    marginLeft: 0,
    marginRight: 10
};

const flexColumnStyle = {
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
};

const getSummary = function( body, show=true ) {
    if ( show ) {
        return ( <div style={ summaryBodyStyle }>{ body }</div> );
    } else {
        return null;
    }
};

const h3Style = {
    margin: '0 1em 0 0',
    whiteSpace: 'nowrap'
};

const summaryBodyStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

export const summaryButtonStyle = {
    border: 'none',
    margin: 0,
    padding: 0,
    fontSize: 'inherit',
    color: 'inherit'
};

const summarySectionStyle = {
    fontSize: '120%',
    marginTop: 10
};

class PostSummary extends PureComponent {
    static propTypes = {
        author: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        commentCount: PropTypes.number.isRequired,
        deleteFunction: PropTypes.func.isRequired,
        downVoteFunction: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        showSummary: PropTypes.bool,
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        upVoteFunction: PropTypes.func.isRequired,
        voteScore: PropTypes.number.isRequired
    };

    render() {
        const {
            author,
            body,
            category,
            commentCount,
            deleteFunction,
            downVoteFunction,
            id,
            showSummary,
            title,
            upVoteFunction,
            voteScore
        } = this.props;
        return (
            <section className="row" style={ summarySectionStyle }>
                <div className="col-xs-12" style={ flexColumnStyle }>
                    <Link to={ `/${category}/${id}` } style={{ color: 'inherit' }}>
                        <h3 style={ h3Style }>{ title }</h3>
                    </Link>
                    { getSummary( body, showSummary ) }
                </div>
                <div className="col-xs-12" style={ flexColumnStyle }>
                    <Score
                        downVoteFunction={ downVoteFunction }
                        postId={ id }
                        score={ voteScore }
                        upVoteFunction={ upVoteFunction }
                    />
                    <Author author={ author } />
                    <CommentData commentCount={ commentCount } />
                    <EditDeleteButtons
                        deleteFunction={ deleteFunction }
                        postId={ id }
                    />
                </div>
            </section>
        );
    }
}

export default PostSummary;
