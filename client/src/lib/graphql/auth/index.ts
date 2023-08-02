import { LoginResponse } from "@/lib/interfaces/login";
import { TypedDocumentNode, gql } from "@apollo/client";

export const mutationLogin: TypedDocumentNode<{
  login: LoginResponse;
}> = gql`
  mutation Login($input: CredentialsAuthInput!) {
    login(credentials: $input) {
      accessToken
      payload {
        sub
        username
        email
        role
        iat
        exp
      }
    }
  }
`;

export const mutationForgotPassword: TypedDocumentNode<{
  email: string;
}> = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      email
    }
  }
`;

export const mutationResetPassword: TypedDocumentNode<{
  email: string;
}> = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(resetPasswordInput: $input) {
      email
    }
  }
`;
