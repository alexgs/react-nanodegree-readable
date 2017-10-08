import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { secondRowBlockStyle, summaryButtonStyle } from './Summary';

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
            <div style={ secondRowBlockStyle }>
                <span className="fa fa-pencil" />
                &nbsp;&nbsp;
                <button
                    className="btn btn-link"
                    style={ summaryButtonStyle }
                    type="button"
                    onClick={ this.handleDeleteClick }
                >
                    <span className="fa fa-trash-o" />
                </button>
            </div>
        );
    }
}

export default PostEditDeleteButtons;
