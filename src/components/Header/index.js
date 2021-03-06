import React from 'react';
import './header.css';
import logo from '../../images/louis-marchesi-logo.jpg';
import NavToggle from './nav-toggle';
import { Link } from 'gatsby';

export const HeaderNavLinks = () =>
    <>
        <li className="site-navbar-item">
            <Link activeClassName="active" to="/about"><small>Louis Marchesi</small>About</Link>
        </li>
        <li className="site-navbar-item">
            <Link activeClassName="active" to="/menu"><small>Great</small>Food</Link>
        </li>
        <li className="site-navbar-item">
            <Link activeClassName="active" to="/rooms"><small>Function</small>Rooms</Link>
        </li>
        <li className="site-navbar-item">
            <Link activeClassName="active" to="/accomodation"><small>Our</small>Accomodation</Link>
        </li>
        <li className="site-navbar-item">
            <Link activeClassName="active" to="/contact"><small>How To</small>Contact</Link>
        </li>
    </>

const Header = (props) => {
    return (
        <header className="site-header">
            <div className="container">
                <div className="row align-items-center ">
                    <div className="col-auto">
                        <Link to="/"><img className="site-logo" src={logo} alt="Louis Marchesi" /></Link>
                    </div>
                    <div className="col-auto ml-md-auto">
                        <a href={`tel:${props.phone}`}>{props.phone}</a>
                    </div>
                    <NavToggle className="ml-auto d-lg-none" />
                </div>
            </div>
            <nav className="site-navbar d-none d-lg-block">
                <ul className="container">
                    <HeaderNavLinks />
                </ul>
            </nav>
        </header>
    )
}

export default Header;