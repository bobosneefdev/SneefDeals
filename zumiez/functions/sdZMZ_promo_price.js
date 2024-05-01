import fs from "fs";
import { alertMeDiscord } from "../../common/functions/sd_alert_me.js";

export function getPromoPrice(price, promoString) {
    try {
        const zmzPromos = JSON.parse(
            fs.readFileSync("./zumiez/data/sdZMZ_promos.json")
        );
        for (const promo of zmzPromos) {
            if (promo.string != promoString) {
                continue;
            }
            if (promo.ratio) {
                return +(price * promo.ratio).toFixed(2);
            }
            if (promo.ppu) {
                return +promo.ppu;
            }
            return null;
        }
        zmzPromos.push(
            {
                string: promoString,
                ratio: null,
                ppu: null,
            }
        );
        fs.writeFileSync("./zumiez/data/sdZMZ_promos.json", JSON.stringify(zmzPromos, null, 4));
        alertMeDiscord(`New promo found: ${promoString}`);
        return null;
    } catch (error) {
        console.log(`getPromoPrice: ${error}`);
        return null;
    }
}
