import { promises as fs } from "fs";
import { sdLogger } from "../../common/functions/sd_logger.js";
import { jsonFilePath } from "../sdZMZ_config.js";

export async function writeItemsJson(data) {
    try {
        const dataString = JSON.stringify(data, null, 4);
        await fs.writeFile(jsonFilePath, dataString, "utf8");
        sdLogger(`Saved items to JSON file.`, true);
        return true;
    } catch (error) {
        sdLogger(`writeItemsJson: ${error}`, true);
        return false;
    }
}
