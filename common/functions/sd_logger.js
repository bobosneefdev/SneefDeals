import { getTime } from "./sd_utility.js";

export function sdLogger(message, divider = null) {
    if (divider == true) {
        console.log(`--------------------------------------------------`);
    } else if (divider) {
        console.log(`${divider}`);
    }
    console.log(`[${getTime()}] ${message}`);
}
