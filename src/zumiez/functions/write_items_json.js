import { promises as fs } from "fs";
import * as sdLogger from "../../common/functions/logger.js";
import { jsonFilePath } from "../config.js";

export async function writeItemsJson(data) {
    try {
        const dataString = JSON.stringify(data, null, 4);
        await fs.writeFile(jsonFilePath, dataString, "utf8");
        sdLogger.infoLog(`Saved items to JSON file.`);
        return true;
    } catch (error) {
        sdLogger.errorLog(error, "writeItemsJson");
        return false;
    }
}