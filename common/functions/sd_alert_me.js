import axios from "axios";
import { webhookUrls } from "../secrets/sd_webhookLinks.js";
import * as sdLogger from "./sd_logger.js";

export async function alertMeDiscord(messageStr) {
    try {
        sdLogger.infoLog(`Posting in Discord: ${messageStr}`, true);
        await axios.post(
            webhookUrls.utility.alerts,
            {
                content: messageStr,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return true;
    } catch (error) {
        sdLogger.errorLog(error, "alertMeDiscord");
        return false;
    }
}
