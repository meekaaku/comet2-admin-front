import { PUBLIC_COMET_ADMIN_API } from "$env/static/public";
import { CometAdminClient } from "./browser/comet-admin-client";
import { Logger } from "./logger";

export const comet = new CometAdminClient(PUBLIC_COMET_ADMIN_API);
export const logger = new Logger('[ comet ]')
