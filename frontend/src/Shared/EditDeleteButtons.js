import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import MetadataBlock from './MetadataBlock';
import MetadataButton from './MetadataButton';

class EditDeleteButtons extends PureComponent {
    static propTypes = {
        deleteFunction: PropTypes.func.isRequired,
        editFunction: PropTypes.func.isRequired,
        targetId: PropTypes.string.isRequired
    };

    constructor( props ) {
        super( props );
        this.handleDeleteClick = this.handleDeleteClick.bind( this );
        this.handleEditClick = this.handleEditClick.bind( this );
    }

    handleDeleteClick() {
        this.props.deleteFunction( this.props.targetId );
    }

    handleEditClick() {
        this.props.editFunction( this.props.targetId );
    }

    render() {
        return (
            <MetadataBlock>
                <MetadataButton clickFunction={ this.handleEditClick }>
                    <span className="fa fa-pencil" />
                </MetadataButton>
                &nbsp;&nbsp;
                <MetadataButton clickFunction={ this.handleDeleteClick }>
                    <span className="fa fa-trash-o" />
                </MetadataButton>
            </MetadataBlock>
        );
    }
}

export default EditDeleteButtons;
