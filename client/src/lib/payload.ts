import { Role } from "@/lib/role";

export type Payload = {
    sub: string;
    username: string;
    email: string;
    role: Role;
    iat: number;
    exp: number;
};