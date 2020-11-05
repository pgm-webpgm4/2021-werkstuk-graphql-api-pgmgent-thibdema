/**
 * The GraphQL queries
 */

const  { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    dummy:Dummy
    getCategoryProducts(category:String!):[Product]
    getAudienceProducts(audience:String!):[Product]
    getProduct(id:ID!):[Product]
    getAllProducts:[Product]
    login(user: UserInput):AuthData
    users:[User]
    user(id:ID):User
  }
`;