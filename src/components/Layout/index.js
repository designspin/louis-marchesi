import React from 'react';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';
import 'bootstrap-4-grid';
import './layout.css';
import Header, { HeaderNavLinks } from '../Header';
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

const Meta = ({ title, description }) =>
  <Helmet>
      <title>{title} | Louis Marchesi</title>
      <meta name="description" content={description} />
  </Helmet>

const Layout = ({ children, data, title, description, ...props}) =>
<>
    <Meta title={title} description={description} />
    <div className={`site-container site-page ${props.navOpen ? 'site-container--nav-on' : ''}`}>
        <div className="site-main">
            <Header phone={ data.phone }/>
            { children }
            <Footer opening={ data.opening }/>
        </div>
        <div className="site-sidebar">
            <ul>
                <HeaderNavLinks />
            </ul>
        </div>
    </div>
</>

const LayoutAlt = ({ children, data, title, description, ...props}) =>
<>
    <Meta title={title} description={description} />
    <div className={`site-container ${props.navOpen ? 'site-container--nav-on' : ''}`}>
        <div className="site-main">
            { React.Children.map(children, child => {
                return React.cloneElement(child, { phone: data.phone })
            })}
            <Footer opening={data.opening}/>
        </div>
        <div className="site-sidebar">
            <ul>
                <HeaderNavLinks />
            </ul>
        </div>
    </div>
</>

const LayoutComponent = (props) =>
  <StaticQuery
    query={ LayoutQuery }
    render={ result => {
        const data = result.markdownRemark.frontmatter;
        
        switch(props.templateKey) {
            case 'home-page':
                return <LayoutAlt data={data} {...props}/>
            default:
                return <Layout data={data} {...props} />
        }
    }} />

const mapStateToProps = (state) => {
    return {
        navOpen: state.layout.navOpen
    }
}

export default connect(mapStateToProps)(LayoutComponent);
