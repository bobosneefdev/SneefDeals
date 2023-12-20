export class SneefWebhook {
    constructor(
        botNameStr, // Username of the discord bot
        botAvatarUrlStr, // URL of desired image for the discord bot's pfp
        textContentStr, // Up to 2000 char string of text message
        embedsArr // Array of embed objects
    ) {
        if (botNameStr) {
            this.username = botNameStr;
        }
        if (botAvatarUrlStr) {
            this.avatar_url = botAvatarUrlStr;
        }
        if (textContentStr) {
            this.content = textContentStr;
        }
        if (embedsArr) {
            this.embeds = embedsArr;
        }
    }
}
