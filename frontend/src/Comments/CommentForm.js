import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const formLabelStyle = {
    fontSize: 14
};

class CommentForm extends PureComponent {
    render() {
        // TODO
        return (
            <div className="col-xs-8" style={{marginTop: 0}}>
                <h3>Add a comment</h3>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label
                            className="col-xs-2 control-label"
                            style={ formLabelStyle }
                            htmlFor="comment-author-name"
                        >
                            Your name
                        </label>
                        <div className="col-xs-10">
                            <input
                                className="form-control"
                                type="text"
                                id="comment-author-name"
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label
                            className="col-xs-2 control-label"
                            style={ formLabelStyle }
                            htmlFor="comment-body"
                        >
                            Comment
                        </label>
                        <div className="col-xs-10">
                            <input
                                className="form-control"
                                type="text"
                                id="comment-body"
                                placeholder="Something insightful and constructive..."
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12 text-right">
                            <button type="button" className="btn btn-default">Reset</button>
                            &nbsp;&nbsp;
                            <button type="submit" className="btn btn-primary">Post</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CommentForm;
