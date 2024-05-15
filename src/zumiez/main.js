import * as sdLogger from "../common/functions/logger.js";
import { fetchItems } from "./functions/fetch_items.js";
import * as sdUtils from "../common/functions/utility.js";
import { ZumiezQueryParams } from "./classes/query_params.js";
import { ZumiezApiFilters } from "./classes/query_filters.js";
import { ZumiezItem } from "./classes/item.js";
import { readItemsJson } from "./functions/read_items_json.js";
import { writeItemsJson } from "./functions/write_items_json.js";
import { hasItemChanged } from "./functions/has_item_changed.js";
import * as settings from "./config.js";
import { postWebhook } from "../common/functions/send_webhook.js";
import { DiscordWebhook } from "../common/classes/discord_webhook.js";
import { createZumiezEmbed } from "./classes/embed.js";

async function scrapeZMZ() {
    try {
        while (true) {
            let itemDatas = await readItemsJson();
            for (const categoryData of settings.categoriesToScrape) {
                sdLogger.infoLog(`SCRAPING ${categoryData.uri}`, true);

                let fetchPageNumber = 1;
                while (true) {
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
                            sdLogger.infoLog(`${newItemData.name}\n${howItChanged}`, true);
                            const webhook = new DiscordWebhook(
                                null,
                                [
                                    createZumiezEmbed(
                                        newItemData,
                                        oldItemData,
                                        howItChanged
                                    )
                                ]
                            );
                            await postWebhook(webhook, categoryData.webhookUrl);
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
                sdLogger.infoLog(`FINISHED SCRAPE OF ${categoryData.uri}`);
                await writeItemsJson(itemDatas);
            }
        }
    } catch (error) {
        sdLogger.errorLog(error, "scrapeZMZ");
        return false;
    }
}
await scrapeZMZ();
