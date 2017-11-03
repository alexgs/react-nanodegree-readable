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
    outline: 'none',
    padding: '0 10px',
    textShadow: 'none',
    textTransform: 'uppercase',
    verticalAlign: 'inherit'
};

// Adapted from Bootstrap's "btn-link" CSS class
const menuItemStyle = {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    boxShadow: 'none',
    color: 'maroon',
    fontWeight: 'bold',
    textTransform: 'uppercase'
};

// TODO Pre-render the menu to get the width of largest element
// TODO Width and cursor of menu items
class SortButton extends PureComponent {
    static propTypes = {
        changeSortModeFunction: PropTypes.func.isRequired,
        currentSortSetting: PropTypes.string.isRequired
    };

    constructor( props ) {
        super( props );
        this.state = {
            showMenu: false
        };

        this.dropdownMenu = null;           // ref to actual dropdown menu
        this.menuButton = null;             // ref to dropdown menu button

        this.handleDateClick = this.handleDateClick.bind( this );
        this.handleOutsideClick = this.handleOutsideClick.bind( this );
        this.handleScoreClick = this.handleScoreClick.bind( this );
        this.toggleMenu = this.toggleMenu.bind( this );
    }

    handleDateClick() {
        this.props.changeSortModeFunction( LIST_VIEW_SORT_DATE );
        this.toggleMenu();
    }

    // Handle clicks outside this component by closing the menu (https://larsgraubner.com/handle-outside-clicks-react)
    handleOutsideClick( event ) {
        // Ignore clicks on the components that have click-handlers
        if ( this.dropdownMenu.contains( event.target ) || this.menuButton.contains( event.target ) ) {
            return;
        }

        this.toggleMenu();
    }

    handleScoreClick() {
        this.props.changeSortModeFunction( LIST_VIEW_SORT_SCORE );
        this.toggleMenu();
    }

    toggleMenu() {
        const menuWillBeVisible = !this.state.showMenu;
        console.log( `--{ Menu will be visible: ${menuWillBeVisible} }--` );

        // If we're going to show the menu, attach a global event listener. Remove it when hiding the menu.
        // The event listener handles outside clicks (https://larsgraubner.com/handle-outside-clicks-react)
        if ( menuWillBeVisible ) {
            document.addEventListener( 'click', this.handleOutsideClick, false );
            console.log( `>-- Add event listener --<` );
        } else {
            document.removeEventListener( 'click', this.handleOutsideClick, false );
            console.log( `>-- Remove event listener --<` );
        }

        this.setState( { showMenu: menuWillBeVisible } );
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
                <ul className="dropdown-menu" style={ dropdownStyle } ref={ menu => this.dropdownMenu = menu }>
                    <li>
                        <button className="btn" onClick={ this.handleScoreClick } style={ menuItemStyle }>
                            highest score
                        </button>
                    </li>
                    <li>
                        <button className="btn" onClick={ this.handleDateClick } style={ menuItemStyle }>
                            newest
                        </button>
                    </li>
                </ul>
                first
            </div>
        );
    }
}

export default SortButton;
