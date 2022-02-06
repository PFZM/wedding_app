import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      lastname
      email
      phone
      admin
      attending
      plusOne
      namePlusOne
      messages {
        messageText
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      name
      lastname
      email
      phone
      admin
      attending
      plusOne
      namePlusOne
      messages {
        messageText
      }
    }
  }
`;
