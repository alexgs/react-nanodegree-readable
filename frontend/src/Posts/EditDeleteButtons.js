import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import MetadataBlock from '../Shared/MetadataBlock';
import MetadataButton from '../Shared/MetadataButton';

class PostEditDeleteButtons extends PureComponent {
    static propTypes = {
        deleteFunction: PropTypes.func.isRequired,
        postId: PropTypes.string.isRequired
    };

    constructor( props ) {
        super( props );
        this.handleDeleteClick = this.handleDeleteClick.bind( this );
    }

    handleDeleteClick() {
        this.props.deleteFunction( this.props.postId );
    }

    render() {
        return (
            <MetadataBlock>
                <span className="fa fa-pencil" />
                &nbsp;&nbsp;
                <MetadataButton clickFunction={ this.handleDeleteClick }>
                    <span className="fa fa-trash-o" />
                </MetadataButton>
            </MetadataBlock>
        );
    }
}

export default PostEditDeleteButtons;
