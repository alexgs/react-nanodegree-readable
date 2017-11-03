import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { LIST_VIEW_SORT_DATE, LIST_VIEW_SORT_SCORE } from '../constants';
import './SortMenu.css';

import map from 'lodash/fp/map';
import flow from 'lodash/fp/flow';
import sortBy from 'lodash/fp/sortBy';
import toPairs from 'lodash/fp/toPairs';

const caretStyle = {
    color: 'maroon'
};

const displayTextValues = {
    [LIST_VIEW_SORT_DATE]: 'newest',
    [LIST_VIEW_SORT_SCORE]: 'highest score'
};

const menuButtonStyle = {
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
    textTransform: 'uppercase',
    width: '100%'
};

class SortMenu extends PureComponent {
    static propTypes = {
        changeSortModeFunction: PropTypes.func.isRequired,
        currentSortSetting: PropTypes.string.isRequired
    };

    constructor( props ) {
        super( props );
        this.state = {
            preRenderComplete: false,
            showMenu: false
        };

        this.dropdownMenu = null;           // ref to actual dropdown menu
        this.menuButton = null;             // ref to dropdown menu button
        this.preRenderBlock = null;         // ref to pre-render output

        this.menuWidth = null;              // width of the menu, as calc'd in the pre-render stage

        this.getButton = this.getButton.bind( this );
        this.getMenu = this.getMenu.bind( this );
        this.handleMenuItemClick = this.handleMenuItemClick.bind( this );
        this.handleOutsideClick = this.handleOutsideClick.bind( this );
        this.toggleMenu = this.toggleMenu.bind( this );
    }

    getButton( displayText, width='auto' ) {
        const buttonStyle = _.merge( {}, menuButtonStyle, { width } );
        return (
            <button
                className="btn btn-default"
                onClick={ this.toggleMenu }
                ref={ button => this.menuButton = button }
                style={ buttonStyle }
            >
                { displayText } <span className="fa fa-caret-down" style={ caretStyle } />
            </button>
        );
    }

    getMenu( dropdownMenuStyle ) {
        const menuItems = flow(
            toPairs,
            map( pair => ({ displayText: pair[1], sortMode: pair[0] }) ),
            sortBy( o => o.displayText ),
            map( ({ displayText, sortMode }) => (
                <li key={ sortMode }>
                    <button className="btn" onClick={ () => this.handleMenuItemClick( sortMode ) } style={ menuItemStyle }>
                        { displayText }
                    </button>
                </li>
            ) )
        )( displayTextValues );

        return (
            <ul className="dropdown-menu" style={ dropdownMenuStyle } ref={ menu => this.dropdownMenu = menu }>
                { menuItems }
            </ul>
        );
    }

    handleMenuItemClick( sortMode ) {
        this.props.changeSortModeFunction( sortMode );
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

    preRender() {
        const preRenderBlockStyle = {
            position: 'absolute',
            top: -1000
        };

        // This will put a lot of values in `this.menuButton`, but we aren't using the ref at this stage, so no worries
        const buttons = _.map( displayTextValues, displayText => (
            <div key={ displayText }>{ this.getButton( displayText ) }</div>
        ) );

        return (
            <div style={ preRenderBlockStyle } ref={ block => this.preRenderBlock = block }>{ buttons }</div>
        )
    }

    toggleMenu() {
        const menuWillBeVisible = !this.state.showMenu;

        // If we're going to show the menu, attach a global event listener. Remove it when hiding the menu.
        // The event listener handles outside clicks (https://larsgraubner.com/handle-outside-clicks-react)
        if ( menuWillBeVisible ) {
            document.addEventListener( 'click', this.handleOutsideClick, false );
        } else {
            document.removeEventListener( 'click', this.handleOutsideClick, false );
        }

        this.setState( { showMenu: menuWillBeVisible } );
    }

    componentDidMount() {
        if ( !this.state.preRenderComplete ) {
            const widestChild = _.maxBy( this.preRenderBlock.children, 'offsetWidth' );
            this.menuWidth = widestChild.offsetWidth;
            this.setState( { preRenderComplete: true } );
        }
    }

    render() {
        if ( !this.state.preRenderComplete ) {
            return this.preRender()
        }

        const displayText = displayTextValues[ this.props.currentSortSetting ];
        const dropdownMenuStyle = {
            display: 'block',
            left: this.menuButton.offsetLeft,
            minWidth: this.menuWidth,
            padding: 0
        };

        const dropdownMenu = this.state.showMenu ? this.getMenu( dropdownMenuStyle ) : null;

        return (
            <div>
                View
                { this.getButton( displayText, this.menuWidth ) }
                first
                { dropdownMenu }
            </div>
        );
    }
}

export default SortMenu;
