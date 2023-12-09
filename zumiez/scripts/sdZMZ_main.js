import { sdLogger } from "../../common/functions/sd_logger.js";
import { fetchItems } from "../functions/sdZMZ_fetchItems.js";
import * as sdUtils from "../../common/functions/sd_utility.js";
import { optsCreator, filtersCreator } from "../classes/sdZMZ_optsCreator.js";
import { categories } from "../objects/sdZMZ_categories.js";
import { zmzItem } from "../classes/sdZMZ_itemCreator.js";
import { readItemsJson } from "../functions/sdZMZ_readItemsJson.js";
import { writeItemsJson } from "../functions/sdZMZ_writeItemsJson.js";
import { evalItemChange } from "../functions/sdZMZ_evalItemChange.js";

// SETTINGS
const saleItems = true;
const minMsBetweenReqs = 15000;
const maxMsBetweenReqs = 25000;

const categoriesToScrape = [
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
const universalFilters = new filtersCreator(
    saleItems,
    false,
    false,
    false,
    false
);

async function scrapeZMZ() {
    try {
        while (true) {
            const oldItems = await readItemsJson();
            const newItems = {};
            for (const category of categoriesToScrape) {
                let page = 1;
                while (true) {
                    sdLogger(`Processing page ${page} of ${category.uri}`)
                    const opts = new optsCreator(
                        category,
                        universalFilters,
                        page
                    )
                    const itemDatas = await fetchItems(opts);
                    sdLogger(JSON.stringify(itemDatas))
                    for (const itemData of itemDatas) {
                        const item = new zmzItem(itemData);
                        newItems[item.id] = item;
                        const hasChanged = evalItemChange(oldItems[item.id], item);
                        if (hasChanged) {

                        }
                    }
                    await sdUtils.randomTimeoutMs(minMsBetweenReqs, maxMsBetweenReqs);
                    if (itemDatas.length < 100) {
                        break;
                    }
                    page++
                }
            }
            const writeNewData = await writeItemsJson(newItems);
        }
    } catch (error) {
        sdLogger(error);
    }
}
await scrapeZMZ();

