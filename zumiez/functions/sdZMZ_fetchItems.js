import axios from "axios";
import { sdLogger } from "../../common/functions/sd_logger.js";
import * as sdUtils from "../../common/functions/sd_utility.js";
import * as settings from "../sdZMZ_userSettings.js";

export async function fetchItems(options) {
    if (!options.category) {
        sdLogger(`fetchItems: Please provide a category.`);
        return false;
    }

    if (!options.filters) {
        sdLogger(`fetchItems: Please provide a filter.`);
        return false;
    }

    const payload = getPayload(options)
    if (!payload) {
        return false;
    }

    let tries = 0;
    let itemDatas = [];
    while (!itemDatas.length && tries < settings.maxRequestAttempts) {
        try {
            tries++
            sdLogger(`TRY ${tries}: Sending request to ${options.category.uri}`);
            const response = await axios.post(
                reqUrl,
                payload,
                headers
            );
            if (response.status != 200) {
                await sdUtils.randomTimeoutMs(180000, 240000);
                continue;
            } else if (
                !response.data ||
                !response.data.content ||
                !response.data.content.product ||
                !response.data.content.product.value
            ) {
                return [];
            }
            const responseItemDatas = response.data.content.product.value;
            if (Array.isArray(responseItemDatas)) {
                itemDatas = responseItemDatas;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            await sdUtils.randomTimeoutMs(90000, 120000);
        }
    }
    return itemDatas;
}

function getPayload(options) {
    try {
        let dataObject = {
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
                n_item: 100,
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

        const filter = options.filters
        if (Object.keys(filter).length) {
            dataObject.data.filter = filter;
        }

        return dataObject;
    } catch (error) {
        sdLogger(`getData: ${error}`);
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
}