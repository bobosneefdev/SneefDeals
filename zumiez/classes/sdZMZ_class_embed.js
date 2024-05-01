import { sdLogger } from "../../common/functions/sd_logger.js";
import { zmzWebhookConfig } from "../sdZMZ_user_settings.js";

export class ZumiezEmbed {
    constructor(newItemData, oldItemData, howItChanged) {
        this.title = newItemData.name;
        this.url = newItemData.url;
        this.color = zmzWebhookConfig.color;
        this.image = { url: newItemData.img };
        this.description = howItChanged;
        this.fields = createFields(newItemData, oldItemData);
    }
}

class Field {
    constructor(title, content, inline) {
        this.name = title;
        this.value = content;
        this.inline = inline || true;
    }
}

function createFields(newItemData, oldItemData) {
    try {
        const allFields = [];
        const fieldOne = createFieldOne(oldItemData, newItemData);
        allFields.push(fieldOne);
        const fieldTwo = createFieldTwo(oldItemData, newItemData);
        allFields.push(fieldTwo);
        const fieldThree = createFieldThree(newItemData);
        allFields.push(fieldThree);
        return allFields;
    } catch (error) {
        sdLogger(`createFields: ${error}`);
        return null;
    }
}

function createFieldOne(oldData, newData) {
    try {
        const header = "BASE PRICE";
        const wasStr = `**Was:** $${oldData.regPrice}`;
        const nowStr = `**Now:** $${newData.regPrice}`;

        const saveDollars = (oldData.regPrice - newData.regPrice).toFixed(2);
        const savePercent = (
            (1 - newData.regPrice / oldData.regPrice) *
            100
        ).toFixed(1);
        const saveStr = `**Save:** $${saveDollars} (${savePercent}%)`;

        const body = `${wasStr}\n${nowStr}\n${saveStr}`;
        return new Field(header, body, true);
    } catch (error) {
        sdLogger(`createFieldOne: ${error}`);
        return new Field("BASE PRICE", "***ERROR***", true);
    }
}

function createFieldTwo(oldData, newData) {
    try {
        const header = "PROMO PRICE";
        let body = "N/A";
        if (newData.promoPrice) {
            let wasStr;
            let nowStr;
            let saveStr;
            if (!oldData.promoPrice) {
                wasStr = `**Was:** N/A`;
                nowStr = `**Now:** ~$${newData.promoPrice}`;
                saveStr = `**Save:** N/A`;
            } else {
                wasStr = `**Was:** ~$${oldData.promoPrice}`;
                nowStr = `**Now:** ~$${newData.promoPrice}`;
                const saveDollars = (
                    oldData.promoPrice - newData.promoPrice
                ).toFixed(2);
                saveStr = `**Save:** ~$${saveDollars}`;
            }
            body = `${wasStr}\n${nowStr}\n${saveStr}`;
        }

        return new Field(header, body, true);
    } catch (error) {
        sdLogger(`createFieldTwo: ${error}`);
        return new Field("PROMO PRICE", "***ERROR***", true);
    }
}

function createFieldThree(newData) {
    try {
        const header = "HISTORY";

        const lowestBase = `**Base Low:** $${newData.lowestReg.price}\n*${newData.lowestReg.date}*`;
        let lowestPromo = "**Promo Low:** N/A";
        if (newData.lowestPromo) {
            lowestPromo = `**Promo Low:** $${newData.lowestPromo.price}\n*${newData.lowestPromo.date}*`;
        }
        const body = `${lowestBase}\n\n${lowestPromo}`;

        return new Field(header, body, true);
    } catch (error) {
        sdLogger(`createFieldTwo: ${error}`);
        return new Field("HISTORY", "***ERROR***", true);
    }
}
