import { ROLE } from "./roles";

export interface UserType {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
    role: ROLE;
    email: string;
    photo: string;
}