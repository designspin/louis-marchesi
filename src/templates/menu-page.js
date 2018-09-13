import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import Img from 'gatsby-image';
import { Link } from 'gatsby';

export const FoodPageTemplate = ({
    content,
    contentComponent,
    title,
    fullImage,
    menus
}) => {
    const PostContent = contentComponent || Content;

    return (
        <>
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
        <aside className="section section--functions">
            <div className="section-title">
                <h2 className="container">Hungry? Take A Look At Our Menus</h2>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    {menus.edges.map((menu, menuIndex) => {
                        return (
                            <div key={`menu-${menuIndex}`} className="col-md-4">
                                <Link className="menu-link" to={menu.node.fields.slug}>
                                    <div className="menu-link-inner">
                                        <svg viewBox="0 0 32 32">
                                            <title>{menu.node.frontmatter.title}</title>
                                            <path d="M7 0c-3.314 0-6 3.134-6 7 0 3.31 1.969 6.083 4.616 6.812l-0.993 16.191c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.993-16.191c2.646-0.729 4.616-3.502 4.616-6.812 0-3.866-2.686-7-6-7zM27.167 0l-1.667 10h-1.25l-0.833-10h-0.833l-0.833 10h-1.25l-1.667-10h-0.833v13c0 0.552 0.448 1 1 1h2.604l-0.982 16.004c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.982-16.004h2.604c0.552 0 1-0.448 1-1v-13h-0.833z"></path>
                                        </svg>
                                        <h4>{menu.node.frontmatter.title}</h4>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </aside>
        </>
    )
};

const FoodPage = ({data}) => {
    
    const { markdownRemark: post } = data;
    const { menus } = data;
    return (
        <Layout templateKey={post.frontmatter.templateKey}>
            <FoodPageTemplate
                content={post.html}
                contentComponent={HTMLContent}
                title={post.frontmatter.title}
                fullImage={post.frontmatter.full_image.childImageSharp.fluid}
                menus={menus}
            />
        </Layout>
    );
};

export default FoodPage;

export const FoodPageQuery = graphql`
 query MenuPage($id: String!) {
     markdownRemark(id: { eq: $id }) {
        id
        html
        fields {
            slug
        }
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
     menus: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___title]}
        filter: { frontmatter: { templateKey: { eq: "menu-detail" }}}
    ) {
        edges {
            node {
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