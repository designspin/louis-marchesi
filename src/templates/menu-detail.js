import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Img from 'gatsby-image';


const MenuPageTemplate = ({ title, fullImage, sections }) => {
    console.log(sections);
    return (
        <div className="site-page">
            <div className="site-hero">
            <Img className="site-hero-image"
                alt={title}
                sizes={fullImage}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%"
                }} />
            </div>
            <section className="section container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="page-title">{title}</h1>
                    </div>
                </div>        
            </section>
        </div>
    )
}

const MenuPage = ({data}) => {
    
    const { markdownRemark: post } = data;
    
    return (
        <Layout templateKey={post.frontmatter.templateKey}>
            <MenuPageTemplate
                title={post.frontmatter.title}
                fullImage={post.frontmatter.full_image.childImageSharp.fluid}
                sections={post.frontmatter.section}
            />
        </Layout>
    );
};

export default MenuPage;

export const MenuDetailQuery = graphql`
 query MenuDetail($id: String!) {
     markdownRemark(id: { eq: $id }) {
        id
        frontmatter {
             title
             templateKey
             description
             full_image {
                childImageSharp {
                    fluid(maxWidth: 1900) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
            section {
                sectionTitle
                sectionItems {
                    menuItem {
                        title
                        description
                        price
                    }
                }
            }
         }
     }
 }
`;

