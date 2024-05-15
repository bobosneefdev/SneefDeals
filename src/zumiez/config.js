import { categories } from "./constants/categories.js";

export const zmzWebhookConfig = {
    color: 0,
    postRetryDelayMs: 10000,
    mainPostDelayMs: 5000,
    zumiezLogoUrl: "https://cdn.discordapp.com/attachments/1186285266479100004/1240084753374384148/f6g0b202DZlYy8MOjjaF5Xu-QZClFxLhYpvAiRZ-NQvPVbgWhqx3b777nzBbH_lq5Zc.png?ex=6645466c&is=6643f4ec&hm=be39b73068535f26c0a4ff06c99e5366b0c169c6948691d0e0b665c43cfa2d52&",
    zumiezUrl: "https://www.zumiez.com/",
};

// Min/Max possible wait times between requests (ms)
export const minMsBetweenReqs = 15000;
export const maxMsBetweenReqs = 20000;

// Max retries on a given request
export const maxRequestAttempts = 3;

// File path to store the scraped item data.
export const jsonFilePath = "./src/zumiez/temp/item_data.json";

export const reqFilters = {
    saleItems: false, // Only sale items?
    brands: [], // List of brands
    colors: [], // List of Colors
    priceRange: [], // [MinUsd, MaxUsd]
    bodyTypes: [], // List of body types (Men's, Women's, Children's)
};

// Items to fetch per request (Default: 100, Max: 100)
export const itemsPerReq = 100;

// Categories to scrape data on
export const categoriesToScrape = [
    categories.mens.tops.tShirts,
    categories.mens.tops.hoodies,
    categories.mens.tops.shirts,
    categories.mens.tops.sweaters,
    categories.mens.tops.tankTops,
    categories.mens.tops.jackets,
    categories.mens.tops.vests,
    categories.mens.bottoms.shorts,
    categories.mens.bottoms.pants,
    categories.mens.bottoms.jeans,
    categories.mens.bottoms.overalls,
    categories.mens.underwear,
    categories.mens.footwear.socks,
    categories.mens.footwear.sneakers,
    categories.womens.tops.tShirts,
    categories.womens.tops.cropTops,
    categories.womens.tops.hoodies,
    categories.womens.tops.shirts,
    categories.womens.tops.tankTops,
    categories.womens.tops.sweaters,
    categories.womens.tops.bodySuits,
    categories.womens.tops.jackets,
    categories.womens.tops.dresses,
    categories.womens.bottoms.pants,
    categories.womens.bottoms.sweatPants,
    categories.womens.bottoms.corduroyPants,
    categories.womens.bottoms.joggers,
    categories.womens.bottoms.overalls,
    categories.womens.bottoms.trackPants,
    categories.womens.bottoms.leggings,
    categories.womens.bottoms.shorts,
    categories.womens.bottoms.jeans,
    categories.womens.bottoms.overalls2,
    categories.womens.bottoms.skirts,
    categories.womens.footwear.socks,
    categories.womens.footwear.sneakers,
    categories.womens.underwear.bras,
    categories.womens.underwear.underwear,
    categories.other.snow.womens,
    categories.other.snow.mens,
    categories.other.snow.snow,
    categories.other.swimwear.womens,
    categories.other.swimwear.mens,
    categories.other.skate.completes,
    categories.other.skate.decks,
    categories.other.skate.parts,
    categories.other.skate.hardware,
    categories.other.accessories.beanies,
    categories.other.accessories.hats,
    categories.other.accessories.belts,
    categories.other.accessories.watches,
    categories.other.accessories.jewelry.womens,
    categories.other.accessories.jewelry.mens,
    categories.other.accessories.backpacks,
    categories.other.accessories.bags,
    categories.other.accessories.wallets,
];