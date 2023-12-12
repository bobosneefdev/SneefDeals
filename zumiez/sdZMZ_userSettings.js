import { categories } from "./objects/sdZMZ_categories.js";

// Min/Max possible wait times between requests (ms)
export const minMsBetweenReqs = 20000;
export const maxMsBetweenReqs = 30000;

// Max retries on a given request
export const maxRequestAttempts = 3;

// File path to store the scraped item data.
export const jsonFilePath = "./zumiez/data/sdZMZ_itemsData.json";

export const reqFilters = {
    saleItems: true,
    brands: [],
    colors: [],
    priceRange: [],
    bodyTypes: []
}
// Query for only sale items (Default: true, Type: Boolean)
export const saleItems = true;

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
    categories.other.accessories.wallets
]