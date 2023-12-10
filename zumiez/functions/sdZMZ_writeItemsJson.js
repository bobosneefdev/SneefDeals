import { promises as fs } from "fs";
import { sdLogger } from "../../common/functions/sd_logger.js";

export async function writeItemsJson(data) {
    try {
        const dataString = JSON.stringify(data, null, 4);
        await fs.writeFile('./zumiez/data/sdZMZ_itemsData.json', dataString, 'utf8');
        sdLogger(`Successfully wrote items to JSON file.`)
        return true;
    } catch (error) {
        sdLogger(`writeItemsJson: ${error}`);
        return false;
    }
}