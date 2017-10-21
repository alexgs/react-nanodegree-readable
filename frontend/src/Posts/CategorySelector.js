import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const formLabelStyle = {
    fontSize: 14
};

class CategorySelector extends PureComponent {
    static propTypes = {
        categories: ImmutablePropTypes.listOf( ImmutablePropTypes.mapContains( {
            name: PropTypes.string.isRequired,
            path: PropTypes.string.isRequired
        } ) ).isRequired,
        htmlId: PropTypes.string.isRequired,
        onChangeFunction: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
    };

    render() {
        const { htmlId, onChangeFunction, value } = this.props;

        const categoryOptions = this.props.categories.map( categoryData => {
            const path = categoryData.get( 'path' );
            const name = categoryData.get( 'name' );
            return ( <option key={ path } value={ path }>{ name }</option> );
        } );

        return (
            <div className="form-group">
                <label
                    className="col-xs-2 control-label"
                    style={ formLabelStyle }
                    htmlFor={ htmlId }
                >
                    Category
                </label>
                <div className="col-xs-10">
                    <select className="form-control" id={ htmlId } onChange={ onChangeFunction } value={ value }>
                        <option value="select" disabled default>Select...</option>
                        { categoryOptions }
                    </select>
                </div>
            </div>
        );
    }
}

export default CategorySelector;
