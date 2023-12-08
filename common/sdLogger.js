import { getTime } from "./sdUtility.js";

export function sdLogger(message) {
    const line = 
    '------------------------------------------------------------------------------------------------------------------------';
    const timeStamp = getTime()
    console.log(line);
    console.log(`[${timeStamp}] : ${message}`);
}