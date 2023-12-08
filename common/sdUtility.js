export function getTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
}

export async function timeout(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
