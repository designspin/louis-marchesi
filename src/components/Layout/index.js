import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap-4-grid';
import './layout.css';
//import Img from 'gatsby-image';
import Header from '../Header';
//import logo from '../../images/louis-marchesi-logo.png';
//import { FaBeer } from 'react-icons/fa';

//import { StaticQuery, graphql } from 'gatsby';


const Layout = ({ children, ...props}) => (
    <div className={`site-container ${props.navOpen ? 'site-container--nav-on' : ''}`}>
        <div className="site-main">
            <Header />
            { children }
        </div>
        <div className="site-sidebar">
            Sidebar!
        </div>
    </div>
);

const LayoutAlt = ({children, ...props}) => (
    <div className={`site-container ${props.navOpen ? 'site-container--nav-on' : ''}`}>
        <div className="site-main">
            { children }
        </div>
        <div className="site-sidebar">
            Sidebar!
        </div>
    </div>
);

/*const FrontPageImage = ({data}) => (
    <div className="site-hero">
        <Img className="site-hero-image"
            alt="Louis Marchesi pub street view"
            sizes={data.headerImage.fluid}
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%"
            }} />
        <div className="site-hero-middle">
            <div className="container">
                
                <h1><img src={logo} alt="Louis Marchesi"/> A Fine Pub In The Heart Of Norwich</h1>
            </div>
        </div>
        <div className="site-hero-bottom">
            <a className="site-hero-see-more">
                <FaBeer size="3rem"/>
            </a>
        </div>
    </div>
)*/

/*const FrontPageQuery = (data) => (
    <StaticQuery
        query={graphql`
            query homeLayoutQuery {
                headerImage: imageSharp(fluid: {
                    originalName: {
                        regex: "/pub_front/"
                    }
                }) {
                    fluid(maxWidth: 1900) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        `}
        render={data => <FrontPageImage data={data} />} />
);*/

/*const LayoutHome = ({ children, ...props }) => {
    return (
        <div className={`site-container ${props.navOpen ? 'site-container--nav-on' : ''}`}>
            <div className="site-main">
                <div className="full-height">
                    <Header />
                    <FrontPageQuery />
                </div>
                { children }
            </div>
            <div className="site-sidebar">
                <nav className="site-navbar d-lg-none">
                    <ul>
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
            </div>
        </div>
    )
}*/

const mapStateToProps = (state) => {
    return {
        navOpen: state.layout.navOpen
    }
}

export default connect(mapStateToProps)(Layout);
export const HomeLayout = connect(mapStateToProps)(LayoutAlt);
