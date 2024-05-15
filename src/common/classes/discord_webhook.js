import * as sdConstants from "../constants.js";

export class DiscordWebhook {
    constructor(
        textContentStr, // Up to 2000 char string of text message
        embedsArr // Array of embed objects
    ) {
        this.username = sdConstants.sdBotUsername;
        this.avatar_url = sdConstants.sdBotLogoUrl;
        if (textContentStr) {
            this.content = textContentStr;
        }
        if (embedsArr) {
            this.embeds = embedsArr;
        }
    }
}

export class DiscordEmbed {
    constructor(
        colorDecimal, // Decimal color value
        authorObj, // Author object (name, url, icon_url)
        titleStr, // Title of the embed
        urlStr, // URL to link the title to
        descriptionStr, // Description of the embed
        fieldsArr, // Array of field objects (name, value, inline)
        thumbnailObj, // Thumbnail object (url)
        imageObj, // Image object (url)
        footerObj // Footer object (text, icon_url)
    ) {
        if (colorDecimal) {
            this.color = colorDecimal;
        }

        if (authorObj) {
            this.author = authorObj;
        }

        if (titleStr) {
            this.title = titleStr;
        }

        if (urlStr) {
            this.url = urlStr;
        }

        if (descriptionStr) {
            this.description = descriptionStr;
        }

        if (fieldsArr) {
            this.fields = fieldsArr;
        }

        if (thumbnailObj) {
            this.thumbnail = thumbnailObj;
        }

        if (imageObj) {
            this.image = imageObj;
        }

        if (footerObj) {
            this.footer = footerObj;
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