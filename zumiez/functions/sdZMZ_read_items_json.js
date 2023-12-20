import { promises as fs } from "fs";
import { sdLogger } from "../../common/functions/sd_logger.js";
import { jsonFilePath } from "../sdZMZ_user_settings.js";

export async function readItemsJson() {
    try {
        const rawData = await fs.readFile(jsonFilePath, "utf8");
        const dataObj = JSON.parse(rawData);
        sdLogger("Pulled in old data successfully.", false);
        return dataObj;
    } catch (error) {
        sdLogger("Failed to pull in old data.", false);
        return {};
    }
}