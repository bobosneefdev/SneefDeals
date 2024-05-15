import * as sdLogger from "../../common/functions/logger.js";

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
            oldItemData.basePrice > newItemData.basePrice && // Base price lowered
            newItemData.basePrice <= newItemData.promoPrice // Base price is less than or equal to promo price
        ) {
            const percentChange = (
                (1 - newItemData.basePrice / oldItemData.basePrice) *
                100
            ).toFixed(0);
            const dollarChange = (oldItemData.basePrice - newItemData.basePrice).toFixed(2);
            return `**BASE PRICE DROP! SAVE $${dollarChange}**\n$${oldItemData.basePrice} **->** $${newItemData.basePrice} (${percentChange}% DROP)`;
        }

        // ITEM PUT ON PROMO
        if (
            oldItemData.promoPrice === null && // No old promo price
            newItemData.promoPrice !== null && // New promo price exists
            newItemData.promoPrice < newItemData.basePrice // Promo price is actually lower than base price
        ) {
            const percentChange = (
                (1 - newItemData.promoPrice / newItemData.basePrice) *
                100
            ).toFixed(0);
            const dollarChange = (newItemData.basePrice - newItemData.promoPrice).toFixed(2);
            return `**NOW ON PROMO! SAVE ~$${dollarChange}**\n$${newItemData.basePrice} **->** $${newItemData.promoPrice} (${percentChange}% DROP)`;
        }

        // PRE-EXISTING PROMO PRICE LOWERED
        if (
            oldItemData.promoPrice !== null && // Old promo price exists
            newItemData.promoPrice !== null && // New promo price exists
            oldItemData.promoPrice > newItemData.promoPrice && // New promo price is lower than old promo price
            newItemData.promoPrice < newItemData.basePrice // Promo price is actually lower than base price
        ) {
            const percentChange = (
                (1 - newItemData.promoPrice / oldItemData.promoPrice) *
                100
            ).toFixed(0);
            const dollarChange = (oldItemData.promoPrice - newItemData.promoPrice).toFixed(2);
            return `**PROMO PRICE DROP! SAVE ~$${dollarChange}**\n$${oldItemData.promoPrice} **->** $${newItemData.promoPrice} (${percentChange}% DROP)`;
        }

        return false;
    } catch (error) {
        sdLogger.infoLog(error, "hasItemChanged");
        return false;
    }
}
