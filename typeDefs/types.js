/**
 * The GraphQL types
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  scalar Date

  #enum Status {
  #  READ,
  #  INTERESTED,
  #  NEVER_READ
  #}

  type Dummy {
    id: ID!
  }

  enum Imagetype {
    JPG,
    JPEG,
    jpg,
    jpeg,
    png,
    PNG,
    gif,
    GIF,
    webp,
    WEBP,
    WebP,
    tif,
    tiff,
    bmp,
    eps,
    EPS,
    raw,
    RAW
  }

  enum Size {
    XS,
    S,
    M,
    L,
    XL,
    XXL
  }

  enum Audience {
    Men,
    Women,
    Kids
  }

  enum Producttype {
    Hat,
    Shoes,
    Bags,
    Shirts,
    Tshirts,
    Pants,
    Underpants,
    Socks,
    Sweaters
  }

  type Image {
    url: String!
    alt: String
    type: Imagetype
  }

  type Category {
    category: String!
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    price: Int!
    images: [Image]!
    categories: [Category]!
    created_At: Date!
    color: [String]!
    sizes: [Size]!
    audience: Audience!
    type: Producttype!
    quantity: Int!
  }

  type AuthData {
    userId: ID
    token: String
  }

  type User {
    id: ID
    email: String
    password: String
  }
`;