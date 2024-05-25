import type { RUserProfile } from "./user.types";

export interface QLogin
{
    tenant: string;
    username: string;
    password: string;
}

export interface RLogin
{
    access: string;
    refresh: string;
    acl: Record<string, any>
    profile: RUserProfile;
}

export interface QRefresh
{
    access: string;
    refresh: string;
}