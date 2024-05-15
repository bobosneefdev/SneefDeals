import { getPromoPrice } from "../functions/calc_promo_price.js";
import * as sdUtils from "../../common/functions/utility.js";
import * as sdLogger from "../../common/functions/logger.js";

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
        this.highestPromo = getHighestPromoPrice(oldItemData, this);
        this.highestBase = getHighestBasePrice(oldItemData, this);
    }
}

function getHighestPromoPrice(oldItemData, newItemData) {
    try {
        if (
            oldItemData?.highestPromo?.price &&
            oldItemData?.highestPromo?.date &&
            oldItemData.highestPromo.price > newItemData.promoPrice
        ) {
            return oldItemData.highestPromo;
        } else if (newItemData.promoPrice) {
            const date = sdUtils.getDateString();
            return {
                price: newItemData.promoPrice,
                date: date,
            };
        } else {
            return null;
        }
    } catch (error) {
        sdLogger.errorLog(error, "getHighestPromoPrice");
        return null;
    }
}

function getHighestBasePrice(oldItemData, newItemData) {
    try {
        if (
            oldItemData?.highestBase?.price &&
            oldItemData?.highestBase?.date &&
            oldItemData.highestBase.price > newItemData.basePrice
        ) {
            return oldItemData.highestBase;
        } else {
            const date = sdUtils.getDateString();
            return {
                price: +newItemData.basePrice,
                date: date,
            };
        }
    } catch (error) {
        sdLogger.errorLog(error, "getHighestBasePrice");
        return null;
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
        sdLogger.errorLog(error, "getLowestPromoPrice");
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
        sdLogger.errorLog(error, "getLowestBasePrice");
        return null;
    }
}
