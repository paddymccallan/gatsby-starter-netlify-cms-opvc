import React, { useState, useEffect } from 'react';
import PropTypes, { any } from 'prop-types'
import { Link, graphql } from 'gatsby'
import { Slide } from 'react-slideshow-image';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import Layout from '../components/Layout'
import Features from '../components/Features'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  slides,
  logoImage,
  images,
  properties,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div>
    <div
      className="full-width-image margin-top-0 headerContainer"
      style={{
        backgroundPosition: `top left`,
        backgroundAttachment: `fixed`
      }}
    >
       <Carousel showThumbs={false} infiniteLoop dynamicHeight={true} style={{zIndex:0}} autoPlay={true}>
          <div>
              <img src={images[0]} />
          </div>
          <div>
              <img src={images[1]} />
          </div>
          <div>
              <img src={images[2]} />
          </div>
        </Carousel>
       

       <img className={""} src={!!logoImage.childImageSharp ? logoImage.childImageSharp.fluid.src : logoImage} style={{zIndex:1, position: "absolute"}}/>

    </div>
    <section className="section section--gradient">
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="content">
                <div className="content">
                  <div className="tile">
                    <h1 className="title">{mainpitch.title}</h1>
                  </div>
                  <div className="tile">
                    <h3 className="subtitle">{mainpitch.description}</h3>
                  </div>
                </div>
                <div className="columns">
                  <div className="column is-12">
                    <h3 className="has-text-weight-semibold is-size-2">
                      {heading}
                    </h3>
                    <p>{description}</p>
                  </div>
                </div>
                <Features gridItems={intro.blurbs} />
                <div className="columns">
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/products">
                      See all products
                    </Link>
                  </div>
                </div>
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    Latest stories
                  </h3>
                  <BlogRoll />
                  <div className="column is-12 has-text-centered">
                    <Link className="btn" to="/blog">
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  logoImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  headerOne: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  images: any,
  properties: any,
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),

}



const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  const images = [
    !!frontmatter.headerOne.childImageSharp ? frontmatter.headerOne.childImageSharp.fluid.src : frontmatter.headerOne,
    !!frontmatter.headerTwo.childImageSharp ? frontmatter.headerTwo.childImageSharp.fluid.src : frontmatter.headerTwo,
    !!frontmatter.headerThree.childImageSharp ? frontmatter.headerThree.childImageSharp.fluid.src : frontmatter.headerThree
  ]

  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
      console.log(`slide transition from ${oldIndex} to ${newIndex}`);
    }
  }

  return (
    <Layout>
      <IndexPageTemplate
        logoImage={frontmatter.logoImage}    
        images={images}    
        properties={properties}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )

}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        logoImage {
          childImageSharp {
            fluid(maxWidth: 2040, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        headerOne {
          childImageSharp {
            fluid(maxWidth: 2040, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        headerTwo {
          childImageSharp {
            fluid(maxWidth: 2040, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        headerThree {
          childImageSharp {
            fluid(maxWidth: 2040, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
