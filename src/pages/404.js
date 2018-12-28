import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout pageTitle="Oups, Somethig went wrong..">
    <SEO title="404: Not found" />
    <Link className="btn btn-primary text-uppercase" to={'/'}>
      Go home
    </Link>
  </Layout>
)

export default NotFoundPage
