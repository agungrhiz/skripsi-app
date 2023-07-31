import { Role } from "@/lib/enums/role";

export type Payload = {
    sub: string;
    username: string;
    email: string;
    role: Role;
    iat: number;
    exp: number;
};