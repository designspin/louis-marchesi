import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap-4-grid';
import './layout.css';
import Header from '../Header';
import Footer from '../Footer';
import { StaticQuery, graphql } from 'gatsby';

const LayoutQuery = graphql`
  query LayoutQuery {
      markdownRemark(fileAbsolutePath: {regex: "/(settings)/"}) {
          frontmatter {
              phone
              email
              opening {
                  sunday
                  monday
                  tuesday
                  wednesday
                  thursday
                  friday
                  saturday
              }
          }
      }
  }  
`;

const Layout = ({ children, ...props}) => 
    <StaticQuery 
        query={ LayoutQuery }
        render={result => {
            
            const data = result.markdownRemark.frontmatter;
            
            return (
            <div className={`site-container ${props.navOpen ? 'site-container--nav-on' : ''}`}>
                <div className="site-main">
                    <Header phone={ data.phone }/>
                    { children }
                    <Footer opening={ data.opening }/>
                </div>
                <div className="site-sidebar">
                    Sidebar!
                </div>
            </div>
            );
        }} />


const LayoutAlt = ({children, ...props}) => (
    <StaticQuery 
        query={ LayoutQuery }
        render={result => {
            
            const data = result.markdownRemark.frontmatter;
            
            return (
                <div className={`site-container ${props.navOpen ? 'site-container--nav-on' : ''}`}>
                <div className="site-main">
                    { React.Children.map(children, child => {
                        return React.cloneElement(child, { phone: data.phone })
                    })}
                    <Footer opening={data.opening}/>
                </div>
                <div className="site-sidebar">
                    Sidebar!
                </div>
            </div>
            );
        }} />
);

const mapStateToProps = (state) => {
    return {
        navOpen: state.layout.navOpen
    }
}

export default connect(mapStateToProps)(Layout);
export const HomeLayout = connect(mapStateToProps)(LayoutAlt);
