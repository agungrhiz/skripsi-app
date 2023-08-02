import { Payload } from "@/lib/types/payload";

export interface LoginResponse {
  accessToken: string;
  payload: Payload;
}
