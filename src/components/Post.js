import React from 'react'
import { Card, CardTitle, CardText, CardSubtitle, CardBody } from 'reactstrap'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const Post = ({ title, author, path, date, body, fluid }) => (
  <Card>
    <Link to={path}>
      <Img className="card-image-top" fluid={fluid} />
    </Link>
    <CardBody>
      <CardTitle>
        <Link to={path}>{title}</Link>
      </CardTitle>
      <CardSubtitle>
        <span className="text-info">{date}</span> by{' '}
        <span className="text-info">{author}</span>
      </CardSubtitle>
      <CardText>{body}</CardText>
      <Link
        to={path}
        className="btn btn-outline-primary float-right text-uppercase"
      >
        Read more
      </Link>
    </CardBody>
  </Card>
)

export default Post
