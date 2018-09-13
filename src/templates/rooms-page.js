import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Card from '../components/Card';
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

const RoomsPage = ({data}) => {
    
    const { markdownRemark: post } = data;
    const { rooms } = data;
    
    return (
        <Layout templateKey={post.frontmatter.templateKey}>
            <RoomsPageTemplate
                content={post.html}
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                fullImage={post.frontmatter.full_image.childImageSharp.fluid}
            />
            <aside className="section section--functions">
                <div className="section-title">
                    <h2 className="container">Space for your event</h2>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                    {
                        rooms.edges.map(room => {
                            
                            const fullImage = room.node.frontmatter.full_image.childImageSharp.fluid;
                            return (
                                <div key={room.node.id} className="col-md-4">
                                    <Card 
                                        imageFull={fullImage} 
                                        title={room.node.frontmatter.title}
                                        excerpt={room.node.excerpt}
                                        slug={room.node.fields.slug} />
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </aside>
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
     rooms: allMarkdownRemark(
         sort: { order: DESC, fields: [frontmatter___title]}
         filter: { frontmatter: { templateKey: { eq: "rooms-detail" }}}
     ) {
         edges {
             node {
                 excerpt(pruneLength: 149)
                 id
                 fields {
                     slug
                 }
                 frontmatter {
                     title
                     full_image {
                        childImageSharp {
                            fluid(maxWidth: 600) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                     }
                 }
             }
         }
     }
 }
`;