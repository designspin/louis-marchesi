import React from 'react';
import './nav-toggle.css';
import { connect } from 'react-redux';
import toggle from '../../redux/actions/layout';

const NavToggle = (props)  => (
    <button
        onClick={props.toggle}
        className={`${(props.className) ? props.className : ''} nav-toggle`}
        aria-label="toggle navigation"
        >
        <span></span>
    </button>
);

const mapDispatchToProps = (dispatch) => {
    return {
        toggle: () => dispatch(toggle())
    }
}
export default connect(null, mapDispatchToProps)(NavToggle);