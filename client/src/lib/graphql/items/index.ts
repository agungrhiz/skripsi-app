import { Item } from "@/lib/interfaces/items";
import { TypedDocumentNode, gql } from "@apollo/client";

export const mutationCreateItem: TypedDocumentNode<{
  createItem: Item;
}> = gql`
  mutation CreateItem($input: CreateItemInput!) {
    createItem(createItemInput: $input) {
      id
      name
      description
      isPublished
      fkPhotoId
    }
  }
`;

export const queryItem: TypedDocumentNode<{
  item: Item;
}> = gql`
  query Item($id: Int!) {
    item(id: $id) {
      id
      name
      description
      isPublished
      fkPhotoId
      upload {
        id
        url
        thumbnailUrl
        name
        size
        type
      }
    }
  }
`;

export const mutationUpdateItem: TypedDocumentNode<{
  updateItem: Item;
}> = gql`
  mutation UpdateItem($input: UpdateItemInput!) {
    updateItem(updateItemInput: $input) {
      id
      name
      description
      isPublished
      fkPhotoId
    }
  }
`;
