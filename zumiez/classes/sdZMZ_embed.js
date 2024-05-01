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
        let body = `**Was:** $${oldItemData.basePrice}\n`;
        body += `**Now:** $${newItemData.basePrice}\n`;

        const saveDollars = (oldItemData.basePrice - newItemData.basePrice).toFixed(2);
        body += `**Save:** $${saveDollars}`;

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

        return new EmbedField(header, body, true);
    } catch (error) {
        sdLogger(`createFieldTwo: ${error}`);
        return new EmbedField("PROMO PRICE", "***ERROR***", true);
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

        return new EmbedField(header, body, true);
    } catch (error) {
        sdLogger(`createFieldTwo: ${error}`);
        return new EmbedField("HISTORY", "***ERROR***", true);
    }
}