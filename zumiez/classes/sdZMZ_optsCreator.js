export class optsCreator {
    constructor(
        categoryObj, // Desired category obj (Found in the sdZMZ_categories.js file)
        filtersObj, // Desired filters (Created via the filtersCreator class)
        pageNum, // Page number to query (EX: 1)
        itemsPerReqNum // Amount of items to fetch per request.
    ) {
        this.category = categoryObj;
        this.filters = filtersObj;
        this.page = pageNum;
    }
}