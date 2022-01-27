const { gql } = require("apollo-server-express");

const typeDefs = ggl`
type User {
_id: ID
username: String
name: String
lastname: String
email: String
password: String
phone: String
admin: Boolean
attending: Boolean
plusOne: Boolean
namePlusOne: Boolean
message: [String]    
}

type Auth {
    token: ID!
    user: User
}

type Message {
_id: ID    
messageText: String
createdAt: Date
username: String
answer: [String]    
}

type Query{
user: User
messages: [Message]
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, name: String!, lastname: String!, email: String!, phone: String!, admin: Boolean!, attending: Boolean!, plusOne: Boolean!, namePlusOne: String): User
    removeUser: User
    addMessage(messagge: String)
}
`;

module.exports = typeDefs;
