import { sdLogger } from "../../common/functions/sd_logger.js";

export function hasItemChanged(oldData, newData) {
    try {
        // IF NO OLD ITEM
        if (!oldData) {
            return false;
        }

        // IF NO CHANGES
        if (oldData == newData) {
            return false;
        }

        // BASE PRICE LOWERED
        if (
            oldData.regPrice > newData.regPrice &&
            newData.regPrice <= newData.promoPrice
        ) {
            const percentChange = (
                (1 - newData.regPrice / oldData.regPrice) *
                100
            ).toFixed(0);
            const dollarChange = (oldData.regPrice - newData.regPrice).toFixed(2);
            return `**BASE PRICE DROPPED BY $${dollarChange}**\n$${oldData.regPrice} **->** $${newData.regPrice} (${percentChange}% DROP)`;
        }

        // ITEM PUT ON PROMO
        if (
            oldData.promoPrice === null &&
            newData.promoPrice !== null &&
            newData.promoPrice < newData.regPrice
        ) {
            const percentChange = (
                (1 - newData.promoPrice / newData.regPrice) *
                100
            ).toFixed(0);
            const dollarChange = (newData.regPrice - newData.promoPrice).toFixed(2);
            return `**NOW ON PROMO, SAVE $${dollarChange}**\n$${newData.regPrice} **->** $${newData.promoPrice} (${percentChange}% OFF)`;
        }

        // PRE-EXISTING PROMO PRICE LOWERED
        if (
            oldData.promoPrice !== null &&
            newData.promoPrice !== null &&
            oldData.promoPrice !== newData.promoPrice &&
            oldData.promoPrice > newData.promoPrice &&
            newData.promoPrice < newData.regPrice
        ) {
            const percentChange = (
                (1 - newData.promoPrice / oldData.promoPrice) *
                100
            ).toFixed(0);
            const dollarChange = (oldData.promoPrice - newData.promoPrice).toFixed(2);
            return `**PROMO PRICE DROPPED BY ${dollarChange}**\n$${oldData.promoPrice} **->** $${newData.promoPrice} (${percentChange}% DROP)`;
        }

        return false;
    } catch (error) {
        sdLogger(`hasItemChanged: ${error}`);
        return false;
    }
}
