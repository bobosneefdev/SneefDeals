import { sdLogger } from "../../common/functions/sd_logger.js";

export function hasItemChanged(oldItemData, newItemData) {
    try {
        // IF NO OLD ITEM
        if (!oldItemData) {
            return false;
        }

        // IF NO CHANGES
        if (oldItemData == newItemData) {
            return false;
        }

        // BASE PRICE LOWERED
        if (
            oldItemData.basePrice > newItemData.basePrice &&
            newItemData.basePrice <= newItemData.promoPrice
        ) {
            const percentChange = (
                (1 - newItemData.basePrice / oldItemData.basePrice) *
                100
            ).toFixed(0);
            const dollarChange = (oldItemData.basePrice - newItemData.basePrice).toFixed(2);
            return `**BASE PRICE DROPPED BY $${dollarChange}**\n$${oldItemData.basePrice} **->** $${newItemData.basePrice} (${percentChange}% DROP)`;
        }

        // ITEM PUT ON PROMO
        if (
            oldItemData.promoPrice === null &&
            newItemData.promoPrice !== null &&
            newItemData.promoPrice < newItemData.basePrice
        ) {
            const percentChange = (
                (1 - newItemData.promoPrice / newItemData.basePrice) *
                100
            ).toFixed(0);
            const dollarChange = (newItemData.basePrice - newItemData.promoPrice).toFixed(2);
            return `**NOW ON PROMO, SAVE $${dollarChange}**\n$${newItemData.basePrice} **->** $${newItemData.promoPrice} (${percentChange}% OFF)`;
        }

        // PRE-EXISTING PROMO PRICE LOWERED
        if (
            oldItemData.promoPrice !== null &&
            newItemData.promoPrice !== null &&
            oldItemData.promoPrice !== newItemData.promoPrice &&
            oldItemData.promoPrice > newItemData.promoPrice &&
            newItemData.promoPrice < newItemData.basePrice
        ) {
            const percentChange = (
                (1 - newItemData.promoPrice / oldItemData.promoPrice) *
                100
            ).toFixed(0);
            const dollarChange = (oldItemData.promoPrice - newItemData.promoPrice).toFixed(2);
            return `**PROMO PRICE DROPPED BY $${dollarChange}**\n$${oldItemData.promoPrice} **->** $${newItemData.promoPrice} (${percentChange}% DROP)`;
        }

        return false;
    } catch (error) {
        sdLogger(`hasItemChanged: ${error}`);
        return false;
    }
}
