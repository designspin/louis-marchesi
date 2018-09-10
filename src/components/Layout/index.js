import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap-4-grid';
import './layout.css';
import Header from '../Header';

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

const mapStateToProps = (state) => {
    return {
        navOpen: state.layout.navOpen
    }
}

export default connect(mapStateToProps)(Layout);
export const HomeLayout = connect(mapStateToProps)(LayoutAlt);
