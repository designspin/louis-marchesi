import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Img from 'gatsby-image';
import Content, { HTMLContent } from '../components/Content';
import './menu-detail.css';

const MenuPageTemplate = ({ 
    content,
    contentComponent,
    title, 
    fullImage, 
    sections 
}) => {
    const PostContent = contentComponent || Content;

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
                        <PostContent content={content} /> 
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 food-menu">
                        {sections.map(section => {
                            return (
                                <div className="food-menu-section">
                                    <h3>{section.sectionTitle}</h3>
                                    {section.sectionNotes && 
                                        <p className="food-menu-section-notes">{section.sectionNotes}</p>
                                    }
                                    <ul className="food-menu-list">
                                        {section.sectionItems.map(item => {
                                            console.log(item);
                                            return (
                                                <li className="food-menu-list-item">
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
    )
}

const MenuPage = ({data}) => {
    
    const { markdownRemark: post } = data;
    
    return (
        <Layout templateKey={post.frontmatter.templateKey}>
            <MenuPageTemplate
                title={post.frontmatter.title}
                content={post.html}
                contentComponent={HTMLContent}
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
 }
`;

