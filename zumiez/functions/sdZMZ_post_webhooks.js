import axios from "axios";
import { ZumiezEmbed } from "../classes/sdZMZ_class_embed.js";
import { SneefWebhook } from "../../common/classes/sd_class_webhook.js";
import * as sd_constants from "../../common/sd_constants.js";
import * as sd_utils from "../../common/functions/sd_utility.js";
import { zmzWebhookConfig } from "../sdZMZ_user_settings.js";
import { sdLogger } from "../../common/functions/sd_logger.js";

export async function postWebhook(
    newItemData,
    oldItemData,
    howItChanged,
    categoryData
) {
    try {
        const embeds = [];
        const embedOne = new ZumiezEmbed(
            newItemData,
            oldItemData,
            howItChanged
        );
        embeds.push(embedOne);
        console.log(`\n\nEMBEDS: ${JSON.stringify(embeds)}`);

        const webhook = new SneefWebhook(
            "SneefDeals",
            sd_constants.sdLogoUrl,
            null,
            embeds
        );

        while (true) {
            await sd_utils.timeout(zmzWebhookConfig.postRetryDelayMs);
            const post = await axios.post(categoryData.webhookUrl, webhook);
            sdLogger(`Posted item in chat (${post.status})`);
            if (post.status >= 200 && post.status < 300) {
                break;
            }
            await sd_utils.timeout(zmzWebhookConfig.postRetryDelayMs);
        }
    } catch (error) {
        sdLogger(`postWebhook: ${error}`);
        return false;
    }
}
