import { getPromoPrice } from "../functions/sdZMZ_promo_price.js";
import { getDate } from "../../common/functions/sd_utility.js";
import { sdLogger } from "../../common/functions/sd_logger.js";

export class ZumiezItem {
    constructor(itemData, oldItemData) {
        if (itemData.promo_text && itemData.promo_text.length) {
            this.promoPrice = getPromoPrice(
                itemData.final_price,
                itemData.promo_text[0]
            );
        } else {
            this.promoPrice = null;
        }

        this.id = itemData.id;
        this.regPrice = +itemData.final_price;
        this.brand = itemData.brand;
        this.name = itemData.name;
        this.img = `https:${itemData.image_url}`;
        this.url = `https://zumiez.com${itemData.product_url}`;
        this.msrp = +itemData.price;
        this.lowestPromo = getLowestPromoPrice(oldItemData, this);
        this.lowestReg = getLowestRegPrice(oldItemData, this);
    }
}

function getLowestPromoPrice(oldData, newData) {
    try {
        if (
            oldData &&
            oldData.lowestPromo &&
            oldData.lowestPromo.price < newData.promoPrice
        ) {
            return +oldData.lowestPromo;
        } else if (newData.promoPrice) {
            const date = getDate();
            return {
                price: +newData.promoPrice,
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

function getLowestRegPrice(oldData, newData) {
    try {
        if (
            oldData &&
            oldData.lowestReg &&
            oldData.lowestReg.price < newData.regPrice
        ) {
            return +oldData.lowestReg;
        } else {
            const date = getDate();
            return {
                price: +newData.regPrice,
                date: date,
            };
        }
    } catch (error) {
        sdLogger(`getLowestRegPrice: ${error}`);
        return null;
    }
}
