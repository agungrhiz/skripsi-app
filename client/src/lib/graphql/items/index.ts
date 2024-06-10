import { Item } from "@/lib/interfaces/item";
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

export const queryItems: TypedDocumentNode<{
  items: Item[];
}> = gql`
  query Items {
    items {
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

export const queryItemsPublished: TypedDocumentNode<{
  itemsPublished: Item[];
}> = gql`
  query ItemsPublished {
    itemsPublished {
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

export const mutationRemoveItem: TypedDocumentNode<{
  removeItem: Item;
}> = gql`
  mutation RemoveItem($id: Int!) {
    removeItem(id: $id) {
      id
      name
      description
      isPublished
      fkPhotoId
    }
  }
`;
