import { categories } from "./objects/sdZMZ_categories.js";

// Min/Max possible wait times between requests (ms)
export const minMsBetweenReqs = 15000;
export const maxMsBetweenReqs = 25000;

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
    categories.mens.tops.t_shirts,
    categories.mens.tops.hoodies,
    categories.mens.tops.shirts,
    categories.mens.tops.sweaters,
    categories.mens.tops.tankTops,
    categories.mens.bottoms.shorts,
    categories.mens.bottoms.pants,
    categories.mens.bottoms.jeans,
    categories.mens.bottoms.overalls,
    categories.mens.outerwear.jackets,
    categories.mens.outerwear.vests,
    categories.mens.snow
]