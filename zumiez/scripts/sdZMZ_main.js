import * as sdLogger from "../../common/functions/sd_logger.js";
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
import { alertMeDiscord } from "../../common/functions/sd_alert_me.js";

async function scrapeZMZ() {
    try {
        while (true) {
            let itemDatas = await readItemsJson();
            for (const categoryData of settings.categoriesToScrape) {
                let fetchPageNumber = 1;
                while (true) {
                    sdLogger.infoLog(`BEGIN SCRAPE OF ${categoryData.uri}`, true);
                    const reqFilters = new ZumiezApiFilters(
                        settings.reqFilters.saleItems,
                        settings.reqFilters.brands,
                        settings.reqFilters.colors,
                        settings.reqFilters.priceRange,
                        settings.reqFilters.bodyTypes
                    );

                    const reqParams = new ZumiezQueryParams(
                        categoryData,
                        reqFilters,
                        fetchPageNumber,
                        settings.itemsPerReq
                    );
                    const fetchedItemDatas = await fetchItems(reqParams);
                    if (!fetchedItemDatas.length) {
                        alertMeDiscord("**ZMZ Scrape:** No items length. Something wrong, check logs.");
                        break;
                    }
                    for (const fetchedItemData of fetchedItemDatas) {
                        const oldItemData = itemDatas[fetchedItemData.id];
                        const newItemData = new ZumiezItem(
                            fetchedItemData,
                            oldItemData
                        );

                        const howItChanged = hasItemChanged(
                            oldItemData,
                            newItemData
                        );
                        if (howItChanged) {
                            sdLogger.infoLog(`${newItemData.name}\n${howItChanged}`);
                            await postWebhook(
                                newItemData,
                                oldItemData,
                                howItChanged,
                                categoryData
                            );
                        }

                        itemDatas[fetchedItemData.id] = newItemData;
                    }
                    await sdUtils.randomTimeoutMs(
                        settings.minMsBetweenReqs,
                        settings.maxMsBetweenReqs
                    );
                    if (fetchedItemDatas.length < settings.itemsPerReq) {
                        break;
                    }
                    fetchPageNumber++;
                }
                sdLogger.infoLog(`FINISHED SCRAPE OF ${categoryData.uri}`, " ");
                await writeItemsJson(itemDatas);
            }
        }
    } catch (error) {
        sdLogger.errorLog(error, "scrapeZMZ");
        return false;
    }
}
await scrapeZMZ();
