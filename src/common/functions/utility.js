import * as sdLogger from "./logger.js";

export function getTimestamp() {
    const now = new Date();
    return now.toUTCString();
}

export function getDateString() {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
        dateStyle: "medium",
    });
}

export async function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export function randNumInRange(min, max) {
    if (min > max) {
        sdLogger.infoLog(`randNumInRange: min cannot be greater than max! Returning avg of min and max.`);
        return (min + max) / 2;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function randomTimeoutMs(min, max) {
    const ms = randNumInRange(min, max);
    if (!ms) {
        return false;
    }
    await timeout(ms);
}
