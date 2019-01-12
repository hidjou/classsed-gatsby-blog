import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import SEO from '../components/seo'
import { Badge, Card, CardBody, CardSubtitle } from 'reactstrap'
import Img from 'gatsby-image'
import { slugify } from '../util/utilityFunctions'
import authors from '../util/authors'
import { DiscussionEmbed } from 'disqus-react'

const SinglePost = ({ data, pageContext, location }) => {
  const post = data.markdownRemark.frontmatter
  const author = authors.find(x => x.name === post.author)

  const baseUrl = 'https://gatsbytutorial.co.uk/'

  const disqusShortname = 'https-gatsbytutorial-co-uk'
  const disqusConfig = {
    identifier: data.markdownRemark.id,
    title: post.title,
    url: baseUrl + pageContext.slug,
  }

  return (
    <Layout
      pageTitle={post.title}
      postAuthor={author}
      authorImageFluid={data.file.childImageSharp.fluid}
    >
      <SEO
        author={post.author}
        title={post.title}
        keywords={post.tags}
        description={post.description}
        url={baseUrl}
        pathname={location.pathname}
      />
      <Card>
        <Img
          className="card-image-top"
          fluid={post.image.childImageSharp.fluid}
        />
        <CardBody>
          <CardSubtitle>
            <span className="text-info">{post.date}</span> by{' '}
            <span className="text-info">{post.author}</span>
          </CardSubtitle>
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
          <ul className="post-tags">
            {post.tags.map(tag => (
              <li key={tag}>
                <Link to={`/tag/${slugify(tag)}`}>
                  <Badge color="primary">{tag}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
      <h3 className="text-center">Share this post</h3>
      <div className="text-center social-share-links">
        <ul>
          <li>
            <a
              href={
                'https://www.facebook.com/sharer/sharer.php?u=' +
                baseUrl +
                pageContext.slug
              }
              className="facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f fa-2x" />
            </a>
          </li>
          <li>
            <a
              href={
                'https://twitter.com/share?url=' +
                baseUrl +
                pageContext.slug +
                '&text=' +
                post.title +
                '&via' +
                'twitterHandle'
              }
              className="twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter fa-2x" />
            </a>
          </li>
          <li>
            <a
              href={
                'https://plus.google.com/share?url=' +
                baseUrl +
                pageContext.slug
              }
              className="google"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-google fa-2x" />
            </a>
          </li>
          <li>
            <a
              href={
                'https://www.linkedin.com/shareArticle?url=' +
                baseUrl +
                pageContext.slug
              }
              className="linkedin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-2x" />
            </a>
          </li>
        </ul>
      </div>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Layout>
  )
}

export const postQuery = graphql`
  query blogPostBySlug($slug: String!, $imageUrl: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        author
        date(formatString: "MMM Do YYYY")
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 700) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default SinglePost
