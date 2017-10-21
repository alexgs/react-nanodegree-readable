import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const formLabelStyle = {
    fontSize: 14
};

class TextInput extends PureComponent {
    static propTypes = {
        htmlId: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        onChangeFunction: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    };

    render() {
        const { htmlId, label, onChangeFunction, placeholder, value } = this.props;
        return (
            <div className="form-group">
                <label
                    className="col-xs-2 control-label"
                    style={ formLabelStyle }
                    htmlFor={ htmlId }
                >
                    { label }
                </label>
                <div className="col-xs-10">
                    <input
                        className="form-control"
                        id={ htmlId }
                        onChange={ onChangeFunction }
                        placeholder={ placeholder }
                        type="text"
                        value={ value }
                    />
                </div>
            </div>
        );
    }
}

export default TextInput;
