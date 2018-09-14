import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Img from 'gatsby-image';
import Content, { HTMLContent } from '../components/Content';

const ContactPageTemplate = ({ 
    content,
    contentComponent,
    title, 
    fullImage, 
}) => {
    const PostContent = contentComponent || Content;

    return (
        <>
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
                        <PostContent content={content} /> 
                    </div>
                </div>
            </section>
        </>
    )
}

const ContactPage = ({data}) => {
    
    const { markdownRemark: post } = data;

    return (
        <Layout templateKey={post.frontmatter.templateKey}>
            <ContactPageTemplate
                title={post.frontmatter.title}
                content={post.html}
                contentComponent={HTMLContent}
                fullImage={post.frontmatter.full_image.childImageSharp.fluid}
            />
        </Layout>
    );
};

export default ContactPage;

export const GontactDetailQuery = graphql`
 query ContactDetail($id: String!) {
     markdownRemark(id: { eq: $id }) {
        id
        html
        frontmatter {
            templateKey
             title
             description
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