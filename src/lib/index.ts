import { COMET_ADMIN_API_BASE_URL} from "./constants";
import { CometAdminClient } from "./browser/comet-admin-client";

export const comet = new CometAdminClient(COMET_ADMIN_API_BASE_URL);
