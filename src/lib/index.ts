import { PUBLIC_COMET_ADMIN_API } from "$env/static/public";
import { CometAdminClient } from "./browser/comet-admin-client";
import { Logger } from "./logger";

export const comet = new CometAdminClient(PUBLIC_COMET_ADMIN_API);
export const logger = new Logger('[ comet ]')

export function assertPermission(permission: string)
{
    const acl = comet.auth.getACL();
    if(!acl[permission]){
        throw new Error(`Permission denied: ${permission}`);
    }
}