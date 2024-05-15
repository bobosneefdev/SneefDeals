import fs from "fs";
import { alertMeDiscord } from "../../common/functions/alert_me.js";
import * as sdLogger from "../../common/functions/logger.js";

export function getPromoPrice(price, promoString) {
    try {
        const zmzPromos = JSON.parse(
            fs.readFileSync("./src/zumiez/perm/promos.json")
        );
        for (const promo of zmzPromos) {
            if (promo.string != promoString) {
                continue;
            }
            if (promo.ratio) {
                return +(price * promo.ratio).toFixed(2);
            }
            if (promo.unit_price) {
                return +promo.unit_price;
            }
            return null;
        }
        zmzPromos.push(
            {
                string: promoString,
                ratio: null,
                unit_price: null,
            }
        );
        fs.writeFileSync("./src/zumiez/perm/promos.json", JSON.stringify(zmzPromos, null, 4));
        alertMeDiscord(`New promo found: ${promoString}`);
        return null;
    } catch (error) {
        sdLogger.errorLog(error, "getPromoPrice");
        return null;
    }
}
