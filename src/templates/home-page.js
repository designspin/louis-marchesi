import React from 'react';
import { graphql } from 'gatsby';
import { HomeLayout } from '../components/Layout';
import Header from '../components/Header';
import Img from 'gatsby-image';
import logo from '../images/louis-marchesi-logo.png';
import { FaBeer } from 'react-icons/fa';

export const HomePageTemplate = ({
    heading,
    fullImage
}) => {
    return (
    <div className="full-height">
        <Header />
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
                    <FaBeer size="3rem"/>
                </a>
            </div>
        </div>
    </div>
    )
}

const HomePage = ({data}) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <HomeLayout>
            <HomePageTemplate
                fullImage={frontmatter.full_image.childImageSharp.fluid}
                heading={frontmatter.heading}
            />
        </HomeLayout>
    )
}

export default HomePage;

export const homePageQuery = graphql`
 query HomePage($id: String!) {
     markdownRemark(id: { eq: $id }) {
         frontmatter {
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