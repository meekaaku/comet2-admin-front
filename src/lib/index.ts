import { PUBLIC_COMET_ADMIN_API } from "$env/static/public";
import { CometAdminClient } from "./browser/comet-admin-client";
export * from "./logger";

export const comet = new CometAdminClient(PUBLIC_COMET_ADMIN_API);
