import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Author from './Author';
import CommentData from './CommentData';
import EditPostContainer from './EditPostContainer';
import Title from './Title';
import EditDeleteButtons from '../Shared/EditDeleteButtons';
import FlexRow from '../Shared/FlexRow';
import Score from '../Shared/Score';

const summaryBodyStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

const summarySectionStyle = {
    fontSize: '120%',
    marginTop: 10
};

class Summary extends PureComponent {
    static propTypes = {
        author: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        commentCount: PropTypes.number.isRequired,
        deleteFunction: PropTypes.func.isRequired,
        downVoteFunction: PropTypes.func.isRequired,
        editFunction: PropTypes.func.isRequired,
        editPostId: PropTypes.string,
        id: PropTypes.string.isRequired,
        submitFunction: PropTypes.func.isRequired,
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
            editFunction,
            editPostId,
            id,
            submitFunction,
            title,
            upVoteFunction,
            voteScore
        } = this.props;

        let content = null;
        if ( editPostId === id ) {
            content = (
                <EditPostContainer
                    body={ body }
                    id={ id }
                    submitFunction={ submitFunction }
                    title={ title }
                />
            );
        } else {
            content = (
                <FlexRow>
                    <Title category={ category } postId={ id } title={ title } />
                    <div style={ summaryBodyStyle }>{ body }</div>
                </FlexRow>
            );
        }

        return (
            <section className="row" style={ summarySectionStyle }>
                { content }
                <FlexRow>
                    <Score
                        downVoteFunction={ downVoteFunction }
                        score={ voteScore }
                        targetId={ id }
                        upVoteFunction={ upVoteFunction }
                    />
                    <Author author={ author } />
                    <CommentData commentCount={ commentCount } />
                    <EditDeleteButtons
                        deleteFunction={ deleteFunction }
                        editFunction={ editFunction }
                        targetId={ id }
                    />
                </FlexRow>
            </section>
        );
    }
}

export default Summary;
