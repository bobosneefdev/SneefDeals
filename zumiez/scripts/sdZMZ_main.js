import { sdLogger } from "../../common/functions/sd_logger.js";
import { fetchItems } from "../functions/sdZMZ_fetchItems.js";
import * as sdUtils from "../../common/functions/sd_utility.js";
import { optsCreator } from "../classes/sdZMZ_optsCreator.js";
import { filtersCreator } from "../classes/sdZMZ_filtersCreator.js";
import { categories } from "../objects/sdZMZ_categories.js";
import { zmzItem } from "../classes/sdZMZ_itemCreator.js";
import { readItemsJson } from "../functions/sdZMZ_readItemsJson.js";
import { writeItemsJson } from "../functions/sdZMZ_writeItemsJson.js";
import { hasItemChanged } from "../functions/sdZMZ_hasItemChanged.js";
import * as settings from "../sdZMZ_userSettings.js";

async function scrapeZMZ() {
    try {
        while (true) {
            const oldItems = await readItemsJson();
            const newItems = {};
            for (const category of settings.categoriesToScrape) {
                let page = 1;
                while (true) {
                    sdLogger(`Processing page ${page} of ${category.uri}`);
                    let filters = new filtersCreator(
                        settings.reqFilters.saleItems,
                        settings.reqFilters.brands,
                        settings.reqFilters.colors,
                        settings.reqFilters.priceRange,
                        settings.reqFilters.bodyTypes
                    );
                    if (category.customFilters) {
                        filters = category.customFilters;
                    }
                    const opts = new optsCreator(
                        category,
                        filters,
                        page,
                        settings.itemsPerReq,
                        proxy
                    )
                    const itemDatas = await fetchItems(opts);
                    
                    for (const itemData of itemDatas) {
                        const item = new zmzItem(itemData);
                        newItems[item.id] = item;
                        const hasChanged = hasItemChanged(oldItems[item.id], item);
                        if (hasChanged) {

                        }
                    }
                    await sdUtils.randomTimeoutMs(settings.minMsBetweenReqs, settings.maxMsBetweenReqs);
                    if (itemDatas.length < settings.itemsPerReq) {
                        break;
                    }
                    page++
                }
            }
            await writeItemsJson(newItems);
        }
    } catch (error) {
        sdLogger(error);
    }
}
await scrapeZMZ();

