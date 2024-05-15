import { promises as fs } from "fs";
import * as sdLogger from "../../common/functions/logger.js";
import { jsonFilePath } from "../config.js";

export async function readItemsJson() {
    try {
        const rawData = await fs.readFile(jsonFilePath, "utf8");
        const dataObj = JSON.parse(rawData);
        sdLogger.infoLog("Pulled in old data successfully.", true);
        return dataObj;
    } catch (error) {
        sdLogger.infoLog("No old data found. Starting fresh.", true);
        return {};
    }
}
