export class ZumiezQueryParams {
    constructor(
        categoryObj, // Desired category obj (Found in the sdZMZ_categories.js file)
        filtersObj, // Desired filters (Created via the filtersCreator class)
        pageNum, // Page number to query (EX: 1)
        itemsPerReqNum = 100 // Amount of items to fetch per request.
    ) {
        this.category = categoryObj;
        this.filters = filtersObj;
        this.page = pageNum;
        this.maxItems = itemsPerReqNum;
    }
}
