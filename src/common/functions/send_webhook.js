import axios from "axios";
import * as sd_constants from "../constants.js";
import * as sd_utils from "./utility.js";
import * as sdLogger from "./logger.js";

export async function postWebhook(webhook, url) {
    try {
        while (true) {
            const post = await axios.post(url, webhook);
            sdLogger.infoLog(`Posted item in chat (${post.status})`, true);
            if (post.status >= 200 && post.status < 300) {
                await sd_utils.timeout(sd_constants.mainPostDelayMs);
                break;
            }
            await sd_utils.timeout(sd_constants.postRetryDelayMs);
        }
    } catch (error) {
        sdLogger.errorLog(error, "postWebhook");
        return false;
    }
}