import { getPromoPrice } from "../functions/sdZMZ_promoPrice.js";

export class zmzItem {
    constructor(item) {
        if (item.promo_text && item.promo_text.length) {
            this.promoPrice = getPromoPrice(
                item.final_price,
                item.promo_text[0]
            )
        }
        this.id = item.id;
        this.regPrice = +item.final_price;
        this.brand = item.brand;
        this.name = item.name;
        this.img = item.image_url;
        this.url = `https://zumiez.com${item.product_url}`;
        this.msrp = +item.price;
    }
}