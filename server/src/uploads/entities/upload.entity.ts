import { UploadType } from '@/uploads//enums/upload-type.enum'

export class Upload {
  id: number
  url: string
  thumbnailUrl: string
  name: string
  size: number
  type: UploadType
  createdAt: Date
  updatedAt: Date
}
