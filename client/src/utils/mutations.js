import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!, $password: String!) {
    resetPassword(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const SEND_FORGOT_EMAIL = gql`
  mutation sendForgotEmail($email: String!) {
    sendForgotEmail(email: $email) {
      email
    }
  }
`;

export const ATTEND_WEDDING = gql`
  mutation attendingWedding($attending: Boolean!) {
    attendingWedding(attending: $attending) {
      _id
      attending
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $name: String!
    $lastname: String!
    $email: String!
    $phone: String!
    $admin: Boolean!
    $plusOne: Boolean!
    $namePlusOne: String
  ) {
    addUser(
      name: $name
      lastname: $lastname
      email: $email
      phone: $phone
      admin: $admin
      plusOne: $plusOne
      namePlusOne: $namePlusOne
    ) {
      name
      lastname
      email
      phone
      admin
      plusOne
      namePlusOne
    }
  }
`;
