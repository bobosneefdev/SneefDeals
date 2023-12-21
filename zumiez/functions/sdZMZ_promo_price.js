import { zmzPromos } from "../objects/sdZMZ_promos.js";
import { alertMeDiscord } from "../../common/functions/sd_alert_me.js";

export function getPromoPrice(price, promoString) {
    for (const promo of zmzPromos) {
        if (promo.string != promoString) {
            continue;
        }
        if (promo.ratio) {
            return +(price * promo.ratio).toFixed(2);
        }
        if (promo.ppu) {
            return promo.ppu;
        }
    }
    alertMeDiscord(`New promo string: ${promoString}`);
    return null;
}
