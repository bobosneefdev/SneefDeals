import { getTime } from "./sd_utility.js";

export function infoLog(message, divider = false, timeStamp = true) {
    if (divider == true) {
        console.log(`////////////////////////////////////////////////////`);
    } else if (divider !== false) {
        console.log(`${divider}`);
    }

    let str = '';
    if (timeStamp) {
        str += `[${getTime()}] `;
    }
    str += message;

    console.log(str);
}

export function errorLog(error, functionName = "Error") {
    console.log(`/-/-/-/-/-/-/-/-/-/${functionName} : ${getTime()}/-/-/-/-/-/-/-/-/-/`);
    console.error(error);
    console.log(`/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/`);
}
