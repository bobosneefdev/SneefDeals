import * as sdLogger from "../../common/functions/sd_logger.js";
import { zmzWebhookConfig } from "../sdZMZ_config.js";
import { DiscordEmbedField } from "../../common/classes/sd_class_webhook.js";

export class ZumiezEmbed {
    constructor(newItemData, oldItemData, howItChanged) {
        this.title = newItemData.name;
        this.url = newItemData.url;
        this.color = zmzWebhookConfig.color;
        this.image = { url: newItemData.img };
        this.description = howItChanged;
        this.fields = [
            createEmbedFieldOne(oldItemData, newItemData),
            createEmbedFieldTwo(oldItemData, newItemData),
            createEmbedFieldThree(newItemData),
        ];
    }
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

        let body = `**Base Low:** $${newItemData.lowestBase.price}\n*${newItemData.lowestBase.date}*\n\n`;
        if (newItemData.lowestPromo) {
            body += `**Promo Low:** $${newItemData.lowestPromo.price}\n*${newItemData.lowestPromo.date}*`;
        } else {
            body += `**Promo Low:** N/A`;
        }

        return new DiscordEmbedField(header, body, true);
    } catch (error) {
        sdLogger.errorLog(error, "createEmbedFieldThree");
        return new DiscordEmbedField("HISTORY", "***ERROR***", true);
    }
}