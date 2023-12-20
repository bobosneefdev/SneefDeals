import { getTime } from "./sd_utility.js";

export function sdLogger(message, dividerStr = null) {
    if (dividerStr != null) {
        console.log(`${dividerStr}`);
    }
    console.log(`[${getTime()}] : ${message}`);
}
