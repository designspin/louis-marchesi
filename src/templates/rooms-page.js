import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Img from 'gatsby-image';

export const RoomsPageTemplate = ({
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
                alt="Rooms at louis Marchesi"
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
                <h1 className="page-title">{title}</h1>
                <PostContent content={content} />        
            </section>
        </div>
    )
};

const RoomsPage = ({data}) => {
    
    const { markdownRemark: post } = data;
    console.log(post);
    return (
        <Layout>
            <RoomsPageTemplate
                content={post.html}
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                fullImage={post.frontmatter.full_image.childImageSharp.fluid}
            />
        </Layout>
    );
};

export default RoomsPage;

export const RoomsPageQuery = graphql`
 query RoomsPage($id: String!) {
     markdownRemark(id: { eq: $id }) {
        id
        html
        frontmatter {
             title
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