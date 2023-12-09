import { getTime } from "./sd_utility.js";

export function sdLogger(message) {
    const line = 
    '------------------------------------------------------------------------------------------------------------------------';
    const timeStamp = getTime()
    console.log(line);
    console.log(`[${timeStamp}] : ${message}`);
}