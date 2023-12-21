import axios from "axios";
import { webhookUrls } from "../secrets/sd_webhookLinks.js";
import { sdLogger } from "./sd_logger.js";

export async function alertMeDiscord(messageStr) {
    try {
        sdLogger(messageStr);
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
        console.log(`alertMeDiscord: ${error}`);
        return false;
    }
}
