import { Gallery } from "@/lib/interfaces/gallery";
import { TypedDocumentNode, gql } from "@apollo/client";

export const mutationCreateGallery: TypedDocumentNode<{
  createGallery: Gallery;
}> = gql`
  mutation CreateGallery($input: CreateGalleryInput!) {
    createGallery(createGalleryInput: $input) {
      id
      title
      description
      isPublished
      fkUploadId
    }
  }
`;

export const queryGalleries: TypedDocumentNode<{
  galleries: Gallery[];
}> = gql`
  query Galleries {
    galleries {
      id
      title
      description
      isPublished
      fkUploadId
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

export const queryGallery: TypedDocumentNode<{
  gallery: Gallery;
}> = gql`
  query Gallery($id: Int!) {
    gallery(id: $id) {
      id
      title
      description
      isPublished
      fkUploadId
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

export const mutationUpdateGallery: TypedDocumentNode<{
  updateGallery: Gallery;
}> = gql`
  mutation UpdateGallery($input: UpdateGalleryInput!) {
    updateGallery(updateGalleryInput: $input) {
      id
      title
      description
      isPublished
      fkUploadId
    }
  }
`;

export const mutationRemoveGallery: TypedDocumentNode<{
  removeGallery: Gallery;
}> = gql`
  mutation RemoveGallery($id: Int!) {
    removeGallery(id: $id) {
      id
      title
      description
      isPublished
      fkUploadId
    }
  }
`;
