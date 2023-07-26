export interface Uploads {
  id: number;
  url: string;
  thumbnailUrl: string;
  name: string;
  size: number;
  type: UploadType;
  createdAt: Date;
  updatedAt: Date;
}

export enum UploadType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  OTHER = "OTHER",
}
