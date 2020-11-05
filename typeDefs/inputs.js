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
`;