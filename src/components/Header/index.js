import React from 'react';
import './header.css';
import logo from '../../images/louis-marchesi-logo.jpg';
import NavToggle from './nav-toggle';

const Header = (props) => {
    return (
        <header className="site-header">
            <div className="container">
                <div className="row align-items-center ">
                    <div className="col-auto">
                        <img className="site-logo" src={logo} alt="Louis Marchesi" />
                    </div>
                    <div className="col-auto ml-md-auto">
                        <a href="tel:01603 763099">01603 763099</a>
                    </div>
                    <NavToggle className="ml-auto d-lg-none" />
                </div>
            </div>
            <nav className="site-navbar d-none d-lg-block">
                <ul className="container">
                    <li className="site-navbar-item">
                        <a href="#"><small>Sample</small>Menus</a>
                    </li>
                    <li className="site-navbar-item">
                        <a href="#"><small>Our</small>Rooms</a>
                    </li>
                    <li className="site-navbar-item">
                        <a href="#"><small>Our</small>Accomodation</a>
                    </li>
                    <li className="site-navbar-item">
                        <a href="#"><small>How To</small>Contact Us</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;