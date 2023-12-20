import { sdLogger } from "../../common/functions/sd_logger.js";

export function hasItemChanged(oldItem, newItem) {
    try {
        // IF NO CHANGES
        if (oldItem == newItem) {
            return false;
        }

        // BRAND NEW ITEM
        if (!oldItem && newItem) {
            if (newItem.promoPrice && newItem.promoPrice < newItem.regPrice) {
                return `PUT ON PROMO!`;
            }
            return `PUT ON SALE!`;
        }

        // BASE PRICE LOWERED
        if (
            oldItem.regPrice > newItem.regPrice &&
            newItem.regPrice < newItem.promoPrice
        ) {
            return `STANDARD PRICE LOWERED!`;
        }

        // ALREADY ON SALE ITEM PUT ON PROMO
        if (
            !oldItem.promoPrice &&
            newItem.promoPrice &&
            newItem.promoPrice < newItem.regPrice
        ) {
            return `WAS ON SALE, NOW ALSO ON PROMO!`;
        }

        // PRE-EXISTING PROMO PRICE LOWERED
        if (
            oldItem.promoPrice > newItem.promoPrice &&
            newItem.promoPrice < newItem.regPrice
        ) {
            return `PROMO PRICE LOWERED!`;
        }
    } catch (error) {
        sdLogger(`hasItemChanged: ${error}`);
        return false;
    }
}
