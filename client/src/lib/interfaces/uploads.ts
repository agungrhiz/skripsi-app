import { UploadType } from "@/lib/enums/upload-type";

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

