import { acl } from "./stores";
import { get } from "svelte/store";

export function assertPermission(permission: string|string[]): void
{
    if(!hasPermission(permission)){
        throw new Error(`Permission denied: ${permission}`);
    }
}

export function hasPermission(permission: string|string[]): boolean
{
    const _acl = get(acl);
    return _acl[permission] ? true : false;
}

export function getPermission(permission: string): any
{
    const _acl = get(acl);
    return _acl[permission];
}