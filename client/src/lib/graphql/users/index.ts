import { Users } from "@/lib/interfaces/users";
import { TypedDocumentNode, gql } from "@apollo/client";

export const mutationCreateUser: TypedDocumentNode<{
  createUser: Users;
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
  users: Users[];
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
  user: Users;
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
  updateUser: Users;
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
  removeUser: Users;
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
