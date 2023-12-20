import { sdLogger } from "./sd_logger.js";

export function getTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
}

export function getDate() {
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
        sdLogger(`randNumInRange: min cannot be greater than max!`);
        return false;
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
