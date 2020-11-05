/**
 * The GraphQL inputs
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  input DummyInput {
    id: ID
  }

  input UserInput {
    email: String
    password: String
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
    price: Int
    images: [ImageInput]
    created_At: Date
    color: [String]!
    sizes: [SizeQuantityInputs]!
    audience: Audience
    type: Producttype
  }
`;