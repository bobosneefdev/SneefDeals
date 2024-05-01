import { sdLogger } from "../../common/functions/sd_logger.js";
import { fetchItems } from "../functions/sdZMZ_fetch_items.js";
import * as sdUtils from "../../common/functions/sd_utility.js";
import { ZumiezQueryParams } from "../classes/sdZMZ_query_params.js";
import { ZumiezApiFilters } from "../classes/sdZMZ_query_filters.js";
import { ZumiezItem } from "../classes/sdZMZ_item.js";
import { readItemsJson } from "../functions/sdZMZ_read_items_json.js";
import { writeItemsJson } from "../functions/sdZMZ_write_items_json.js";
import { hasItemChanged } from "../functions/sdZMZ_has_item_changed.js";
import * as settings from "../sdZMZ_config.js";
import { postWebhook } from "../functions/sdZMZ_post_webhooks.js";

async function scrapeZMZ() {
    try {
        while (true) {
            let firstRun = false;
            const oldItemDatas = await readItemsJson();
            if (!Object.keys(oldItemDatas).length) {
                firstRun = true;
            }

            const newItems = {};
            for (const categoryData of settings.categoriesToScrape) {
                let page = 1;
                while (true) {
                    sdLogger(`BEGIN SCRAPE OF ${categoryData.uri}`, true);
                    const reqFilters = new ZumiezApiFilters(
                        settings.reqFilters.saleItems,
                        settings.reqFilters.brands,
                        settings.reqFilters.colors,
                        settings.reqFilters.priceRange,
                        settings.reqFilters.bodyTypes
                    );

                    const reqOpts = new ZumiezQueryParams(
                        categoryData,
                        reqFilters,
                        page,
                        settings.itemsPerReq
                    );
                    const itemDatas = await fetchItems(reqOpts);
                    if (!itemDatas.length) {
                        break;
                    }

                    for (const itemData of itemDatas) {
                        const oldItemData = oldItemDatas[itemData.id];
                        const newItemData = new ZumiezItem(
                            itemData,
                            oldItemData
                        );

                        if (!firstRun) {
                            const howItChanged = hasItemChanged(
                                oldItemData,
                                newItemData
                            );
                            if (howItChanged) {
                                sdLogger(
                                    `${newItemData.name}: ${howItChanged}`
                                );
                                await postWebhook(
                                    newItemData,
                                    oldItemData,
                                    howItChanged,
                                    categoryData
                                );
                            }
                        }
                        newItems[newItemData.id] = newItemData;
                    }
                    await sdUtils.randomTimeoutMs(
                        settings.minMsBetweenReqs,
                        settings.maxMsBetweenReqs
                    );
                    if (itemDatas.length < settings.itemsPerReq) {
                        break;
                    }
                    page++;
                }
                sdLogger(`END SCRAPE OF ${categoryData.uri}`, " ");
            }
            await writeItemsJson(newItems);
        }
    } catch (error) {
        sdLogger(error);
        return false;
    }
}
await scrapeZMZ();
