import { getTimestamp } from "./utility.js";

export function infoLog(message, divider = false, timeStamp = true) {
    if (divider == true) {
        console.log(``);
    } else if (divider !== false) {
        console.log(`${divider}`);
    }

    let str = '';
    if (timeStamp) {
        str += `[${getTimestamp()}] `;
    }
    str += message;

    console.log(str);
}

export function errorLog(error, functionName = "Error") {
    console.log('');
    infoLog(`${functionName}`);
    console.error(error);
    console.log('');
}
