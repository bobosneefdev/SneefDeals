import axios from "axios";
import { ZumiezEmbed } from "../classes/sdZMZ_embed.js";
import { DiscordWebhook } from "../../common/classes/sd_class_webhook.js";
import * as sd_constants from "../../common/sd_constants.js";
import * as sd_utils from "../../common/functions/sd_utility.js";
import { zmzWebhookConfig } from "../sdZMZ_config.js";
import * as sdLogger from "../../common/functions/sd_logger.js";

export async function postWebhook(
    newItemData,
    oldItemData,
    howItChanged,
    categoryData
) {
    try {
        const embeds = [
            new ZumiezEmbed(
                newItemData,
                oldItemData,
                howItChanged
            )
        ];

        const webhook = new DiscordWebhook(
            "SneefDeals",
            sd_constants.sdLogoUrl,
            null,
            embeds
        );

        while (true) {
            const post = await axios.post(categoryData.webhookUrl, webhook);
            sdLogger.infoLog(`Posted item in chat (${post.status})`);
            if (post.status >= 200 && post.status < 300) {
                await sd_utils.timeout(zmzWebhookConfig.mainPostDelayMs);
                break;
            }
            await sd_utils.timeout(zmzWebhookConfig.postRetryDelayMs);
        }
    } catch (error) {
        sdLogger.errorLog(error, "postWebhook");
        return false;
    }
}
