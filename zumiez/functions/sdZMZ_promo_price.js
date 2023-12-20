import { zmzPromos } from "../objects/sdZMZ_promos.js";

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
}
