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
        const header = "REG PRICE";

        let wasStr;
        let nowStr;
        let saveStr;

        if (!oldData) {
            wasStr = `Was: N/A`;
            nowStr = `Now: $${newData.regPrice}`;
            saveStr = `Save: N/A`;
        } else {
            wasStr = `Was: $${oldData.regPrice}`;
            nowStr = `Now: $${newData.regPrice}`;

            const saveDollars = (oldData.regPrice - newData.regPrice).toFixed(
                2
            );
            const savePercent = (
                (1 - newData.regPrice / oldData.regPrice) *
                100
            ).toFixed(1);
            saveStr = `Save: $${saveDollars} (${savePercent}%)`;
        }
        const body = `${wasStr}\n${nowStr}\n${saveStr}`;

        return new Field(header, body, true);
    } catch (error) {
        sdLogger(`createFieldOne: ${error}`);
        return null;
    }
}

function createFieldTwo(oldData, newData) {
    try {
        const header = "PROMO PRICE";
        let body = "Not on promo";
        if (newData.regPrice != newData.promoPrice) {
            let wasStr;
            let nowStr;
            let saveStr;
            if (!oldData) {
                wasStr = `Was: N/A`;
                nowStr = `Now: ~$${newData.promoPrice}`;
                saveStr = `Save: N/A`;
            } else {
                wasStr = `Was: ~$${oldData.promoPrice}`;
                nowStr = `Now: ~$${newData.promoPrice}`;

                const saveDollars = (
                    oldData.promoPrice - newData.promoPrice
                ).toFixed(2);
                const savePercent = (
                    (1 - newData.promoPrice / oldData.promoPrice) *
                    100
                ).toFixed(1);
                saveStr = `Save: ~$${saveDollars} (${savePercent}%)`;
            }

            body = `${wasStr}\n${nowStr}\n${saveStr}`;
        }

        return new Field(header, body, true);
    } catch (error) {
        sdLogger(`createFieldTwo: ${error}`);
        return null;
    }
}

function createFieldThree(newData) {
    try {
        const header = "HISTORY";

        const lowestReg = `Reg Low: $${newData.lowestReg.price}\n${newData.lowestReg.date}`;
        const lowestPromo = `Promo Low: $${newData.lowestPromo.price}\n${newData.lowestPromo.date}`;
        const body = `${lowestReg}\n\n${lowestPromo}`;

        return new Field(header, body, true);
    } catch (error) {
        sdLogger(`createFieldTwo: ${error}`);
        return null;
    }
}
