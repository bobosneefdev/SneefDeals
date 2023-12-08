import { sdLogger } from "../../common/sdLogger.js";
import { fetchItems } from "../functions/sdZMZ_fetchItems.js";
import * as sdUtils from "../../common/sdUtility.js";
import { getOptionsRoutine } from "../functions/sdZMZ_allOptionsRoutine.js";

const saleItems = true;

async function scrapeZMZ() {
    const routine = getOptionsRoutine(saleItems);
    while (true) {

        for (const query of routine) {
            const itemsData = await fetchItems(query);
            sdLogger(JSON.stringify(itemsData));
            await sdUtils.timeout(20000);
        }
    }
}
await scrapeZMZ();

