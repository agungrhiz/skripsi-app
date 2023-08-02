import { User } from "@/lib/interfaces/user";
import { TypedDocumentNode, gql } from "@apollo/client";

export const mutationCreateUser: TypedDocumentNode<{
  createUser: User;
}> = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
      username
      email
      role
    }
  }
`;

export const queryUsers: TypedDocumentNode<{
  users: User[];
}> = gql`
  query Users {
    users {
      id
      username
      email
      emailVerified
      role
    }
  }
`;

export const queryUser: TypedDocumentNode<{
  user: User;
}> = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      username
      email
      role
    }
  }
`;

export const mutationUpdateUsers: TypedDocumentNode<{
  updateUser: User;
}> = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      id
      username
      email
      role
    }
  }
`;

export const mutationRemoveUser: TypedDocumentNode<{
  removeUser: User;
}> = gql`
  mutation RemoveUser($id: String!) {
    removeUser(id: $id) {
      id
      username
      email
      emailVerified
      role
    }
  }
`;
