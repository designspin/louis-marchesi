import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Img from 'gatsby-image';
import logo from '../images/louis-marchesi-logo.png';
import { FaBeer } from 'react-icons/fa';
import FBEvents from '../components/FB/events';
import GoogleMap from '../components/GoogleMap/googlemap';

const SiteHero = ({ isPreview, fullImage, heading }) => {
    const preview = isPreview ? (
        <div className="site-hero">
            <Img className="site-hero-image"
                alt="Louis Marchesi pub street view"
                sizes={fullImage}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%"
                }} />
            <div className="site-hero-middle">
                <div className="container">
                    
                    <h1><img src={logo} alt="Louis Marchesi"/>{ heading }</h1>
                </div>
            </div>
            <div className="site-hero-bottom">
                <a className="site-hero-see-more">
                    <FaBeer size="2rem"/>
                </a>
            </div>
        </div>
    ) : (
        <div 
            className="site-hero"
            style={{
                backgroundImage: `url(${fullImage})`,
                backgroundSize: "cover"
            }}
        >
            <div className="site-hero-middle">
                <div className="container">
                    
                    <h1><img src={logo} alt="Louis Marchesi"/>{ heading }</h1>
                </div>
            </div>
            <div className="site-hero-bottom">
                <a className="site-hero-see-more">
                    <FaBeer size="2rem"/>
                </a>
            </div>
        </div>
    );

    return preview;
}

export const HomePageTemplate = ({
    isPreview,
    heading,
    fullImage,
    ...props
}) => {
    return (
    <>
        <div className="full-height">
            <Header phone={props.phone}/>
            <SiteHero isPreview={ isPreview } fullImage={ fullImage } heading={ heading } />
        </div>
        <section className="section section--red">
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <GoogleMap />
                    </div>
                    <div className="col-md-5">
                        <FBEvents />
                    </div>
                </div>
            </div>
        </section>
    </>
    )
}

const HomePage = ({data}) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout templateKey={frontmatter.templateKey}>
            <HomePageTemplate
                isPreview="false"
                fullImage={frontmatter.full_image.childImageSharp.fluid}
                heading={frontmatter.heading}
            />
        </Layout>
    )
}

export default HomePage;

export const homePageQuery = graphql`
 query HomePage($id: String!) {
     markdownRemark(id: { eq: $id }) {
         frontmatter {
             templateKey
             heading
             full_image {
                 childImageSharp {
                     fluid(maxWidth: 1900) {
                         ...GatsbyImageSharpFluid
                     }
                 }
             }
         }
     }
 }
`