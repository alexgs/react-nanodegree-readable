import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { LIST_VIEW_SORT_DATE, LIST_VIEW_SORT_SCORE } from '../constants';
import './SortButton.css';

const caretStyle = {
    color: 'maroon'
};

const displayTextValues = {
    [LIST_VIEW_SORT_DATE]: 'newest',
    [LIST_VIEW_SORT_SCORE]: 'highest score'
};

const dropdownButtonStyle = {
    backgroundImage: 'none',
    color: 'maroon',
    fontWeight: 'bold',
    margin: '0 7px',
    padding: '0 10px',
    textShadow: 'none',
    textTransform: 'uppercase',
    verticalAlign: 'inherit'
};

const menuItemStyle = {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    boxShadow: 'none',
    color: 'maroon',
    fontWeight: 'bold',
    textTransform: 'uppercase'
};

class SortButton extends PureComponent {
    static propTypes = {
        changeSortSettingFunction: PropTypes.func.isRequired,
        currentSortSetting: PropTypes.string.isRequired
    };

    constructor( props ) {
        super( props );
        this.state = {
            showMenu: false
        };

        this.menuButton = null;     // ref to dropdown menu button

        this.toggleMenu = this.toggleMenu.bind( this );
    }

    // Handle clicks outside this component by closing the menu (https://larsgraubner.com/handle-outside-clicks-react)

    toggleMenu() {
        const toggleValue = !this.state.showMenu;
        // console.log( `--{ showMenu: ${toggleValue} }--` );
        this.setState( { showMenu: toggleValue } );
    }

    render() {
        const displayText = displayTextValues[ this.props.currentSortSetting ];
        const dropdownStyle = this.state.showMenu ? {
            display: 'block',
            left: this.menuButton.offsetLeft,
            minWidth: this.menuButton.offsetWidth,
            padding: 0
        } : null;

        return (
            <div>
                View
                <button
                    className="btn btn-default"
                    onClick={ this.toggleMenu }
                    ref={ button => this.menuButton = button }
                    style={ dropdownButtonStyle }
                >
                    { displayText } <span className="fa fa-caret-down" style={ caretStyle } />
                </button>
                <ul className="dropdown-menu" style={ dropdownStyle }>
                    <li><button className="btn" style={ menuItemStyle }>highest score</button></li>
                    <li><button className="btn" style={ menuItemStyle }>newest</button></li>
                </ul>
                first
            </div>
        );
    }
}

export default SortButton;
