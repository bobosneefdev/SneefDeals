import { sdLogger } from "../../common/functions/sd_logger.js";

export function hasItemChanged(oldItem, newItem) {
    try {
        // IF NO OLD ITEM
        if (!oldItem) {
            return false;
        }

        // IF NO CHANGES
        if (oldItem == newItem) {
            return false;
        }

        // BASE PRICE LOWERED
        if (
            oldItem.regPrice > newItem.regPrice &&
            newItem.regPrice <= newItem.promoPrice
        ) {
            return `STANDARD PRICE DROP!`;
        }

        // ITEM PUT ON PROMO
        if (
            oldItem.promoPrice == null &&
            newItem.promoPrice != null &&
            newItem.promoPrice < newItem.regPrice
        ) {
            return `NOW ON PROMO!`;
        }

        // PRE-EXISTING PROMO PRICE LOWERED
        if (
            oldItem.promoPrice != newItem.promoPrice &&
            oldItem.promoPrice > newItem.promoPrice &&
            newItem.promoPrice < newItem.regPrice
        ) {
            console.log(`OLD PROMO PRICE: ${oldItem.promoPrice}`);
            console.log(`NEW PROMO PRICE: ${newItem.promoPrice}`);

            return `PROMO PRICE DROP!`;
        }

        return false;
    } catch (error) {
        sdLogger(`hasItemChanged: ${error}`);
        return false;
    }
}
