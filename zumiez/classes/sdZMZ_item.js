import { getPromoPrice } from "../functions/sdZMZ_promo_price.js";
import * as sdUtils from "../../common/functions/sd_utility.js";
import { sdLogger } from "../../common/functions/sd_logger.js";

export class ZumiezItem {
    constructor(newItemData, oldItemData) {
        if (newItemData.promo_text && newItemData.promo_text.length) {
            this.promoPrice = getPromoPrice(
                newItemData.final_price,
                newItemData.promo_text[0]
            );
        } else {
            this.promoPrice = null;
        }

        this.id = newItemData.id;
        this.basePrice = +newItemData.final_price;
        this.brand = newItemData.brand;
        this.name = newItemData.name;
        this.img = `https:${newItemData.image_url}`;
        this.url = `https://zumiez.com${newItemData.product_url}`;
        this.msrp = +newItemData.price;
        this.lowestPromo = getLowestPromoPrice(oldItemData, this);
        this.lowestBase = getLowestBasePrice(oldItemData, this);
    }
}

function getLowestPromoPrice(oldItemData, newItemData) {
    try {
        if (
            oldItemData?.lowestPromo &&
            oldItemData.lowestPromo.price < newItemData.promoPrice
        ) {
            return oldItemData.lowestPromo;
        } else if (newItemData.promoPrice) {
            const date = sdUtils.getDateString();
            return {
                price: +newItemData.promoPrice,
                date: date,
            };
        } else {
            return null;
        }
    } catch (error) {
        sdLogger(`getLowestPromoPrice: ${error}`);
        return null;
    }
}

function getLowestBasePrice(oldItemData, newItemData) {
    try {
        if (
            oldItemData?.lowestBase?.price &&
            oldItemData?.lowestBase?.date &&
            oldItemData.lowestBase.price < newItemData.basePrice
        ) {
            return oldItemData.lowestBase;
        } else {
            const date = sdUtils.getDateString();
            return {
                price: +newItemData.basePrice,
                date: date,
            };
        }
    } catch (error) {
        sdLogger(`getlowestBasePrice: ${error}`);
        return null;
    }
}
