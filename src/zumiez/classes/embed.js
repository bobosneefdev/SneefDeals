import * as sdLogger from "../../common/functions/logger.js";
import { zmzWebhookConfig } from "../config.js";
import { DiscordEmbedField, DiscordEmbed } from "../../common/classes/discord_webhook.js";
import { getTimestamp } from "../../common/functions/utility.js";

export function createZumiezEmbed(
    newItemData,
    oldItemData,
    howItChanged
) {
    const embed = new DiscordEmbed(
        zmzWebhookConfig.color,
        {
            name: "Zumiez",
            url: zmzWebhookConfig.zumiezUrl,
            icon_url: zmzWebhookConfig.zumiezLogoUrl,
        },
        newItemData.name,
        newItemData.url,
        howItChanged,
        [
            createEmbedFieldOne(oldItemData, newItemData),
            createEmbedFieldTwo(oldItemData, newItemData),
            createEmbedFieldThree(newItemData),
        ],
        null,
        { url: newItemData.img },
        {
            text: getTimestamp()
        }
    );
    return embed;
}

function createEmbedFieldOne(oldItemData, newItemData) {
    try {
        const header = "BASE PRICE";
        let body = `**Was:** $${oldItemData.basePrice}\n`;
        body += `**Now:** $${newItemData.basePrice}\n`;

        const saveDollars = (oldItemData.basePrice - newItemData.basePrice).toFixed(2);
        body += `**Save:** $${saveDollars}`;

        return new DiscordEmbedField(header, body, true);
    } catch (error) {
        sdLogger.errorLog(error, "createEmbedFieldOne");
        return new DiscordEmbedField("BASE PRICE", "***ERROR***", true);
    }
}

function createEmbedFieldTwo(oldItemData, newItemData) {
    try {
        const header = "PROMO PRICE";
        let body = "N/A";
        if ( // Item put on promo
            newItemData.promoPrice &&
            !oldItemData.promoPrice
        ) {
            body = `**Was:** N/A\n`;
            body += `**Now:** ~$${newItemData.promoPrice}\n`;
            body += `**Save:** N/A`;
        } else if (newItemData.promoPrice) { // Promo price lowered
            body = `**Was:** ~$${oldItemData.promoPrice}\n`;
            body += `**Now:** ~$${newItemData.promoPrice}\n`;
            const saveDollars = (oldItemData.promoPrice - newItemData.promoPrice).toFixed(2);
            body += `**Save:** ~$${saveDollars}\n`;
        }

        return new DiscordEmbedField(header, body, true);
    } catch (error) {
        sdLogger.errorLog(error, "createEmbedFieldTwo");
        return new DiscordEmbedField("PROMO PRICE", "***ERROR***", true);
    }
}

function createEmbedFieldThree(newItemData) {
    try {
        const header = "HISTORY";

        let body = ''
        
        if (newItemData.lowestBase.price >= newItemData.basePrice) {
            body += `**Base Low:** Now\n`;
        } else if (
            newItemData.lowestBase.price &&
            newItemData.lowestBase.price < newItemData.basePrice
        ) {
            body += `**Base Low:** $${newItemData.lowestBase.price}\n*${newItemData.lowestBase.date}*\n\n`;
        }

        if (
            newItemData.highestBase.price &&
            newItemData.highestBase.price > newItemData.basePrice
        ) {
            body += `**Base High:** $${newItemData.highestBase.price}\n*${newItemData.highestBase.date}*\n\n`;
        }

        if (newItemData.lowestPromo >= newItemData.promoPrice) {
            body += `**Promo Low:** Now\n\n`;
        } else if (
            newItemData.lowestPromo.price &&
            newItemData.lowestPromo.price < newItemData.promoPrice
        ) {
            body += `**Promo Low:** $${newItemData.lowestPromo.price}\n*${newItemData.lowestPromo.date}*\n\n`;
        }

        if (
            newItemData.highestPromo.price &&
            newItemData.highestPromo.price > newItemData.promoPrice
        ) {
            body += `**Promo High:** $${newItemData.highestPromo.price}\n*${newItemData.highestPromo.date}*\n\n`;
        }

        return new DiscordEmbedField(header, body, true);
    } catch (error) {
        sdLogger.errorLog(error, "createEmbedFieldThree");
        return new DiscordEmbedField("HISTORY", "***ERROR***", true);
    }
}