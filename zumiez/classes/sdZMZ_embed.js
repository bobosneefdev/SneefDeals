import { sdLogger } from "../../common/functions/sd_logger.js";
import { zmzWebhookConfig } from "../sdZMZ_config.js";

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

class EmbedField {
    constructor(title, content, inline) {
        this.name = title;
        this.value = content;
        this.inline = inline || true;
    }
}

function createEmbedFieldOne(oldItemData, newItemData) {
    try {
        const header = "BASE PRICE";
        const wasStr = `**Was:** $${oldItemData.basePrice}`;
        const nowStr = `**Now:** $${newItemData.basePrice}`;

        const saveDollars = (oldItemData.basePrice - newItemData.basePrice).toFixed(2);
        const savePercent = (
            (1 - newItemData.basePrice / oldItemData.basePrice) *
            100
        ).toFixed(1);
        const saveStr = `**Save:** $${saveDollars} (${savePercent}%)`;

        const body = `${wasStr}\n${nowStr}\n${saveStr}`;
        return new EmbedField(header, body, true);
    } catch (error) {
        sdLogger(`createFieldOne: ${error}`);
        return new EmbedField("BASE PRICE", "***ERROR***", true);
    }
}

function createEmbedFieldTwo(oldItemData, newItemData) {
    try {
        const header = "PROMO PRICE";
        let body = "N/A";
        if (newItemData.promoPrice) {
            let wasStr;
            let nowStr;
            let saveStr;
            if (!oldItemData.promoPrice) {
                wasStr = `**Was:** N/A`;
                nowStr = `**Now:** ~$${newItemData.promoPrice}`;
                saveStr = `**Save:** N/A`;
            } else {
                wasStr = `**Was:** ~$${oldItemData.promoPrice}`;
                nowStr = `**Now:** ~$${newItemData.promoPrice}`;
                const saveDollars = (
                    oldItemData.promoPrice - newItemData.promoPrice
                ).toFixed(2);
                saveStr = `**Save:** ~$${saveDollars}`;
            }
            body = `${wasStr}\n${nowStr}\n${saveStr}`;
        }

        return new EmbedField(header, body, true);
    } catch (error) {
        sdLogger(`createFieldTwo: ${error}`);
        return new EmbedField("PROMO PRICE", "***ERROR***", true);
    }
}

function createEmbedFieldThree(newItemData) {
    try {
        const header = "HISTORY";

        const lowestBase = `**Base Low:** $${newItemData.lowestBase.price}\n*${newItemData.lowestBase.date}*`;
        let lowestPromo = "**Promo Low:** N/A";
        if (newItemData.lowestPromo) {
            lowestPromo = `**Promo Low:** $${newItemData.lowestPromo.price}\n*${newItemData.lowestPromo.date}*`;
        }
        const body = `${lowestBase}\n\n${lowestPromo}`;

        return new EmbedField(header, body, true);
    } catch (error) {
        sdLogger(`createFieldTwo: ${error}`);
        return new EmbedField("HISTORY", "***ERROR***", true);
    }
}