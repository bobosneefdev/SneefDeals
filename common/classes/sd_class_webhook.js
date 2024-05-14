export class DiscordWebhook {
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

export class DiscordEmbedField {
    constructor(title, content, inline) {
        this.name = title;
        this.value = content;
        this.inline = inline || true;
    }
}