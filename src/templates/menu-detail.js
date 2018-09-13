import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Img from 'gatsby-image';
import Content, { HTMLContent } from '../components/Content';
import { Link } from 'gatsby';

const MenuPageTemplate = ({ 
    content,
    contentComponent,
    title, 
    fullImage, 
    sections,
    menus
}) => {
    const PostContent = contentComponent || Content;

    return (
        <>
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
                        <PostContent content={content} /> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 food-menu">
                        {sections.map((section, sectionIndex) => {
                            return (
                                <div key={`section-${sectionIndex}`}className="food-menu-section">
                                    <h3>{section.sectionTitle}</h3>
                                    {section.sectionNotes && 
                                        <p className="food-menu-section-notes">{section.sectionNotes}</p>
                                    }
                                    <ul className="food-menu-list">
                                        {section.sectionItems.map((item, itemIndex) => {
                                            return (
                                                <li key={`item-${sectionIndex}-${itemIndex}`} className="food-menu-list-item">
                                                    <div>
                                                        <h4>{item.menuItem.title}</h4>
                                                        <span>{item.menuItem.price}</span>
                                                    </div>
                                                    <p>{item.menuItem.description}</p>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>        
            </section>
        </div>
        <aside className="section section--functions">
            <div className="section-title">
                <h2 className="container">See More Menus</h2>
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    {menus.edges.map((menu, menuIndex) => {
                        return (
                            <div key={`menu-${menuIndex}`}className="col-md-4">
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
}

const MenuPage = ({data}) => {
    
    const { markdownRemark: post } = data;
    const { menus } = data;

    return (
        <Layout templateKey={post.frontmatter.templateKey}>
            <MenuPageTemplate
                title={post.frontmatter.title}
                content={post.html}
                contentComponent={HTMLContent}
                fullImage={post.frontmatter.full_image.childImageSharp.fluid}
                sections={post.frontmatter.section}
                menus={menus}
            />
        </Layout>
    );
};

export default MenuPage;

export const MenuDetailQuery = graphql`
 query MenuDetail($id: String!) {
     markdownRemark(id: { eq: $id }) {
        id
        html
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
                sectionNotes
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
     menus: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___title]}
        filter: { 
            id: { ne: $id }
            frontmatter: { templateKey: { eq: "menu-detail" }}
        }
    ) {
        edges {
            node {
                id
                fields {
                    slug
                }
                frontmatter {
                    title
                }
            }
        }
    }
 }
`;

