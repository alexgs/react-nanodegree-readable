import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { CATEGORY_ALL, STORE_CATEGORIES, STORE_POSTS_BY_CATEGORY, STORE_POSTS_DATA } from '../constants';
import { downloadPostsStart } from '../Posts/actions';
import PostSummary from '../Posts/PostSummary';

const categoryNameStyle = {
    color: 'maroon',
    fontSize: '120%',
};

const titleStyle = {
    fontSize: 20,
    fontWeight: 600,
    textTransform: 'uppercase'
};

class ListView extends PureComponent {
    static propTypes = {
        category: PropTypes.string.isRequired,
        categories: ImmutablePropTypes.listOf( ImmutablePropTypes.mapContains( {
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
        } ) ).isRequired,
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
        const categoryId = this.props.category;
        const postData = this.props[ STORE_POSTS_DATA ];
        let postIds = null;
        let title = null;

        // Get a title for the page and a list of post IDs to display
        if ( categoryId === CATEGORY_ALL ) {
            postIds = postData.keySeq();
            title = 'All Posts';
        } else {
            postIds = this.props[ STORE_POSTS_BY_CATEGORY ].get( categoryId );
            if ( !postIds ) {
                postIds = Immutable.Set();
            }

            const categoryName = this.props.categories.size === 0 ? '' : this.props.categories
                .find( value => value.get( 'path' ) === categoryId )
                .get( 'name' );
            title = <span>Posts in the <span style={ categoryNameStyle }>{ categoryName }</span> Category</span>;
        }

        const postSummaries = postIds.map( id => {
            const data = postData.get( id );
            return (
                <PostSummary
                    key={ data.id }
                    author={ data.author }
                    body={ data.body }
                    category={ data.category }
                    deleted={ data.deleted }
                    id={ data.id }
                    timestamp={ data.timestamp }
                    title={ data.title }
                    voteScore={ data.voteScore }
                />
            );
        } );

        return (
            <div>
                <h2 style={ titleStyle }>{ title }</h2>
                { postSummaries }
            </div>
        );
    }
}

export default connect( state => ({
    categories: state.get( STORE_CATEGORIES ),
    [STORE_POSTS_BY_CATEGORY]: state.get( STORE_POSTS_BY_CATEGORY ),
    [STORE_POSTS_DATA]: state.get( STORE_POSTS_DATA )
}) )( ListView );
