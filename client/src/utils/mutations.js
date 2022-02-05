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
