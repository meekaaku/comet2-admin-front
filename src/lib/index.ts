import { PUBLIC_COMET_ADMIN_API } from "$env/static/public";
import { CometAdminClient } from "./browser/comet-admin-client";
import { acl } from "./stores";
import { get } from "svelte/store";
import { Logger } from "./logger";

export const comet = new CometAdminClient(PUBLIC_COMET_ADMIN_API);
export const logger = new Logger('[ comet ]')

export function assertPermission(permission: string)
{
    if(!hasPermission(permission)){
        throw new Error(`Permission denied: ${permission}`);
    }
}

export function hasPermission(permission: string)
{
    const _acl = get(acl);
    return _acl[permission] ? true : false;
}

export function getPermission(permission: string)
{
    const _acl = get(acl);
    return _acl[permission];
}