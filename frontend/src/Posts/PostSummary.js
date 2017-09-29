import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import PostAuthor from './PostAuthor';
import PostScore from './PostScore';

// TODO (1) Listed posts are displayed with
// TODO     (a) title
// TODO     (b) author
// TODO     (c) number of comments
// TODO     (d) current score
// TODO     (e) a voting mechanism to upvote or downvote the post.
// TODO     (f) buttons or links for editing or deleting the post
// TODO (2) The voting mechanism works and correctly displays the new vote score after clicking.

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

const h3Style = {
    margin: '0 1em 0 0',
    whiteSpace: 'nowrap'
};

const summaryBodyStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
        deleted: PropTypes.bool.isRequired,
        id: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        voteScore: PropTypes.number.isRequired
    };

    render() {
        const { author, body, voteScore, title } = this.props;
        return (
            <section className="row" style={ summarySectionStyle }>
                <div className="col-xs-12" style={ flexColumnStyle }>
                    <h3 style={ h3Style }>{ title }</h3>
                    <div style={ summaryBodyStyle }>{ body }</div>
                </div>
                <div className="col-xs-12" style={ flexColumnStyle }>
                    <PostScore score={ voteScore } />
                    <PostAuthor author={ author } />
                    <div style={ secondRowBlockStyle }>comments: 0</div>
                </div>
            </section>
        );
    }
}

export default PostSummary;
