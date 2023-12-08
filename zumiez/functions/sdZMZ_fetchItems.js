import axios from "axios";
import { sdLogger } from "../../common/sdLogger.js";

export async function fetchItems(options) {
    if (!options.category) {
        sdLogger(`No category found with that name.`);
        return false;
    }

    const data = getData(options)
    if (!data) {
        return false;
    }

    const rawResponse = await axios.post(
        reqUrl,
        data,
        headers
    );
    const itemArr = rawResponse.data.content.product.value;
    console.log(JSON.stringify(itemArr[0]));
    return itemArr;
}

function getData(options) {
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
                page_number: 1,
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
        console.log(JSON.stringify(filter))

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