import { promises as fs } from "fs";

export async function readItemsJson() {
    try {
        const rawData = await fs.readFile('./zumiez/data/sdZMZ_itemsData.json', 'utf8');
        const dataObj = JSON.parse(rawData);
        return dataObj;
    } catch (error) {
        return {};
    }
}