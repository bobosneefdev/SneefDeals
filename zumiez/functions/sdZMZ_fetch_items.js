import axios from "axios";
import * as sdLogger from "../../common/functions/sd_logger.js";
import * as sdUtils from "../../common/functions/sd_utility.js";
import * as settings from "../sdZMZ_config.js";

export async function fetchItems(options) {
    if (!options.category) {
        sdLogger.infoLog(`fetchItems: Please provide a category.`);
        return false;
    }

    if (!options.filters) {
        sdLogger.infoLog(`fetchItems: Please provide a filter.`);
        return false;
    }

    const payloadObj = getPayload(options);
    if (!payloadObj) {
        return false;
    }

    for (let i = 1; i <= settings.maxRequestAttempts; i++) {
        try {
            sdLogger.infoLog(
                `REQUEST ATTEMPT #${i} FOR PAGE ${options.page}`,
                " "
            );
            const response = await axios.post(reqUrl, payloadObj, headers);
            if (payloadObj.data.filter) {
                sdLogger.infoLog(`Request Filters:`);
                sdLogger.infoLog(`${JSON.stringify(options.filters)}`);
            }

            const itemDatas = response?.data?.content?.product?.value;
            if (
                response.status != 200 ||
                !itemDatas ||
                !Array.isArray(itemDatas)
            ) {
                sdLogger.infoLog(`fetchItems: Invalid response.`);
                await sdUtils.randomTimeoutMs(180000, 240000);
                continue;
            }

            if (!itemDatas.length) {
                sdLogger.infoLog(`fetchItems: No items found.`);
                return [];
            }

            return itemDatas;
        } catch (error) {
            sdLogger.errorLog(error, "fetchItems");
            await sdUtils.randomTimeoutMs(90000, 120000);
        }
    }
}

function getPayload(options) {
    try {
        let payloadObj = {
            data: {
                context: {
                    page: {
                        uri: options.category.uri,
                        locale_country: "us",
                        locale_language: "en",
                    },
                    user: {
                        uuid: "",
                    },
                    store: {},
                },
                n_item: options.maxItems,
                page_number: options.page,
                sort: {
                    choices: true,
                },
                content: {
                    product: {
                        field: {
                            value: [
                                "id",
                                "sku",
                                "brand",
                                "name",
                                "price",
                                "final_price",
                                "image_url",
                                "product_url",
                                "product_group",
                                "product_group_id",
                                "stock_tier",
                                "promotion_flag",
                                "promo_text",
                            ],
                        },
                    },
                },
                widget: {
                    rfkid: "rfkid_10",
                },
                facet: {
                    max: -1,
                    brand: {
                        total: true,
                        max: -1,
                    },
                    color: {
                        total: true,
                        max: -1,
                    },
                    promo_text: {
                        total: true,
                        max: -1,
                    },
                    final_price: {
                        total: true,
                        max: -1,
                    },
                    size: {
                        total: true,
                        max: -1,
                    },
                    promotion_flag: {
                        total: true,
                        max: -1,
                    },
                    en: {
                        total: true,
                        max: -1,
                    },
                    category_tree: {
                        total: true,
                        min_count: 3,
                        max: 100,
                        depth: 10,
                        start_level: 1,
                    },
                },
                rfk_force_exp_features: ["useStdCategories"],
            },
        };

        if (Object.keys(options.filters).length) {
            payloadObj.data.filter = options.filters;
        }

        return payloadObj;
    } catch (error) {
        sdLogger.errorLog(error, "getPayload");
        return false;
    }
}

const reqUrl = "https://zumiez-us-prod.sc.zumiez.com/api/search-rec/3";

const headers = {
    headers: {
        authority: "zumiez-us-prod.sc.zumiez.com",
        accept: "*/*",
        "accept-language": "en-US,en;q=0.8",
        "content-type": "application/json",
    },
};
