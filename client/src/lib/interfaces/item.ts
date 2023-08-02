import { Uploads } from "@/lib/interfaces/upload";

export interface Item {
  id: number;
  name: string;
  description: string;
  isPublished: boolean;
  fkPhotoId: number;
  upload: Uploads;
}
