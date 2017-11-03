import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const caretStyle = {
    color: 'maroon'
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

class SortButton extends PureComponent {
    static propTypes = {

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
        console.log( `--{ showMenu: ${toggleValue} }--` );
        this.setState( { showMenu: toggleValue } );
    }

    render() {
        const dropdownStyle = this.state.showMenu ? {
            display: 'block',
            left: this.menuButton.offsetLeft,
            minWidth: this.menuButton.offsetWidth
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
                    highest score <span className="fa fa-caret-down" style={ caretStyle } />
                </button>
                <ul className="dropdown-menu" style={ dropdownStyle }>
                    <li><button className="btn btn-link">highest score</button></li>
                    <li><button className="btn btn-link">newest</button></li>
                </ul>
                first
            </div>
        );
    }
}

export default SortButton;
