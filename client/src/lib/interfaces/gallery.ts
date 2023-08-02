import { Uploads } from "@/lib/interfaces/upload";

export interface Gallery {
  id: number;
  title: string;
  description: string;
  isPublished: boolean;
  fkUploadId: number;
  upload: Uploads;
}
