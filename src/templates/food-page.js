import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Img from 'gatsby-image';

export const FoodPageTemplate = ({
    content,
    contentComponent,
    title,
    fullImage
}) => {
    const PostContent = contentComponent || Content;

    return (
        <div className="site-page">
            <div className="site-hero">
            <Img className="site-hero-image"
                alt="Food at louis Marchesi"
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
                        <PostContent content={content} />
                    </div>
                </div>        
            </section>
        </div>
    )
};

const FoodPage = ({data}) => {
    
    const { markdownRemark: post } = data;
    const { rooms } = data;
    
    return (
        <Layout templateKey={post.frontmatter.templateKey}>
            <FoodPageTemplate
                content={post.html}
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                fullImage={post.frontmatter.full_image.childImageSharp.fluid}
            />
        </Layout>
    );
};

export default FoodPage;

export const FoodPageQuery = graphql`
 query FoodPage($id: String!) {
     markdownRemark(id: { eq: $id }) {
        id
        html
        frontmatter {
             title
             templateKey
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
`;