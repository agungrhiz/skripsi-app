import { Uploads } from "@/lib/interfaces/uploads";

export interface Item {
  id: number;
  name: string;
  description: string;
  isPublished: boolean;
  fkPhotoId: number;
  upload: Uploads;
}
