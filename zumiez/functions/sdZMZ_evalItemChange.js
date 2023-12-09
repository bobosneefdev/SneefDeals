import { sdLogger } from "../../common/functions/sd_logger.js";

export function evalItemChange(oldItem, newItem) {
    try {
        // IF NO CHANGES
        if (oldItem == newItem) {
            return false;
        }

        // BRAND NEW ITEM
        if (!oldItem && newItem) {
            if (
                newItem.promoPrice &&
                newItem.promoPrice < newItem.regPrice
            ) {
                return `PUT ON PROMO FOR ~$${newItem.promoPrice}!`;
            }
            return `PUT ON SALE FOR $${newItem.regPrice}!`;
        }

        // BASE PRICE LOWERED
        if (
            oldItem.regPrice > newItem.regPrice &&
            newItem.regPrice < newItem.promoPrice
        ) {
            return `BASE PRICE NOW $${newItem.regPrice}, WAS $${oldItem.regPrice}!`;
        }

        // ALREADY ON SALE ITEM PUT ON PROMO
        if (
            !oldItem.promoPrice &&
            newItem.promoPrice &&
            newItem.promoPrice < newItem.regPrice
        ) {
            return `PUT ON PROMO FOR ~$${newItem.promoPrice}`;
        }

        // PRE-EXISTING PROMO PRICE LOWERED
        if (
            oldItem.promoPrice > newItem.promoPrice &&
            newItem.promoPrice < newItem.regPrice
        ) {
            return `PROMO PRICE NOW ~$${newItem.promoPrice}, WAS ~$${oldItem.promoPrice}!`;
        }
    } catch (error) {
        sdLogger(`evalItemChange: ${error}`);
        return false;
    }
}
