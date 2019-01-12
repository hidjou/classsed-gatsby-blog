import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

function SEO({
  author,
  description,
  lang,
  meta,
  keywords,
  title,
  url,
  pathname,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
            meta={[
              {
                name: 'description',
                content: description,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: description,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                property: 'og:url',
                content: pathname ? url + pathname : url,
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: author,
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: description,
              },
            ]
              .concat(
                keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : []
              )
              .concat(meta)}
          />
        )
      }}
    />
  )
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
}

export default SEO

export const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
