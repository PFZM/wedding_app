const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    lastname: String
    email: String
    phone: String
    admin: Boolean
    attending: Boolean
    plusOne: Boolean
    namePlusOne: String
    messages: [Message]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Message {
    _id: ID
    messageText: String
    createdAt: Date
    answers: [Answer]
  }

  type Answer {
    _id: ID
    answerId: String
    answerBody: String
    userId: String
    createdAt: Date
  }

  type Query {
    users: [User]
    user(_id: ID): User
    me: User
    messages: [Message]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signUp(email: String!, password: String!): Auth
    addUser(
      name: String!
      lastname: String!
      email: String!
      phone: String!
      admin: Boolean!
      attending: Boolean!
      plusOne: Boolean!
      namePlusOne: String
    ): User
    editUser(
      name: String!
      lastname: String!
      email: String!
      phone: String!
      admin: Boolean!
      attending: Boolean!
      plusOne: Boolean!
      namePlusOne: String
    ): User
    addMessage(messaggeText: String!): Message
    editMessage(messageText: String): Message
    addAnswer(answerBody: String!, messageId: ID, answerId: ID): Answer
  }
`;

module.exports = typeDefs;