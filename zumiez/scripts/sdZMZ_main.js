import { sdLogger } from "../../common/functions/sd_logger.js";
import { fetchItems } from "../functions/sdZMZ_fetchItems.js";
import * as sdUtils from "../../common/functions/sd_utility.js";
import { optsCreator } from "../classes/sdZMZ_optsCreator.js";
import { filtersCreator } from "../classes/sdZMZ_filtersCreator.js";
import { zmzItem } from "../classes/sdZMZ_itemCreator.js";
import { readItemsJson } from "../functions/sdZMZ_readItemsJson.js";
import { writeItemsJson } from "../functions/sdZMZ_writeItemsJson.js";
import { hasItemChanged } from "../functions/sdZMZ_hasItemChanged.js";
import * as settings from "../sdZMZ_userSettings.js";

async function scrapeZMZ() {
    try {
        while (true) {
            let firstRun = false;
            const oldItems = await readItemsJson();
            if (!Object.keys(oldItems).length) {
                firstRun = true;
                sdLogger(`Performing first time run!`);
            } else {
                sdLogger(`Pulled in previous item data.`);
            }
            const newItems = {};
            for (const categoryData of settings.categoriesToScrape) {
                let page = 1;
                while (true) {
                    sdLogger(`Processing page ${page} of ${categoryData.uri}`);

                    let filterOpts = settings.reqFilters;
                    if (categoryData.filterOverwrite) {
                        for (const filter in categoryData.filterOverwrite) {
                            sdLogger(`CUSTOM FILTER FOR ${filter}: ${categoryData.filterOverwrite[filter]}`);
                            filterOpts[filter] = categoryData.filterOverwrite[filter];
                        }
                    }
                    const reqFilters = new filtersCreator(
                        filterOpts.saleItems,
                        filterOpts.brands,
                        filterOpts.colors,
                        filterOpts.priceRange,
                        filterOpts.bodyTypes
                    );

                    const reqOpts = new optsCreator(
                        categoryData,
                        reqFilters,
                        page,
                        settings.itemsPerReq,
                    )
                    const itemDatas = await fetchItems(reqOpts);
                    if (!itemDatas.length) {
                        break;
                    }
                    
                    for (const itemData of itemDatas) {
                        const item = new zmzItem(itemData);
                        newItems[item.id] = item;
                        if (!firstRun) {
                            const hasChanged = hasItemChanged(oldItems[item.id], item);
                            if (hasChanged) {
                                sdLogger(`${item.name} ${hasChanged}`)
                            }
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

