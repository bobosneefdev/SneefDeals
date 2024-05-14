import { promises as fs } from "fs";
import * as sdLogger from "../../common/functions/sd_logger.js";
import { jsonFilePath } from "../sdZMZ_config.js";

export async function readItemsJson() {
    try {
        const rawData = await fs.readFile(jsonFilePath, "utf8");
        const dataObj = JSON.parse(rawData);
        sdLogger.infoLog("Pulled in old data successfully.", false);
        return dataObj;
    } catch (error) {
        sdLogger.errorLog(error, "readItemsJson");
        return {};
    }
}
