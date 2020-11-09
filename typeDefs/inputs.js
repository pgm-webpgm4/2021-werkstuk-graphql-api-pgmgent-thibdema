/**
 * The GraphQL inputs
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  input DummyInput {
    id: ID
  }

  input TokenInput {
    token: String
    id: ID
  }

  input UserInput {
    email: String
    password: String
  }

  input FilterInput {
    audience: String
    category: String
  }

  input ImageInput {
    url: String!
    alt: String
  }

  input SizeQuantityInputs {
    size: Size!
    quantity: Int!
  }

  input ProductInput {
    title: String!
    description: String!
    price: Float
    images: [ImageInput]
    created_At: Date
    color: [String]!
    sizes: [SizeQuantityInputs]!
    audience: Audience
    type: Producttype
  }

  input EditProductInput {
    title: String
    description: String
    price: Int
    images: [ImageInput]
    created_At: Date
    color: [String]
    sizes: [SizeQuantityInputs]
    audience: Audience
    type: Producttype
  }
`;