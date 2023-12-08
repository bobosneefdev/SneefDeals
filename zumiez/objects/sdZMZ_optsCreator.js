import * as filterRef from "../objects/sdZMZ_filters.js";

export class optsCreator {
    constructor(
        category, // Desired category obj (Found in the sdZMZ_categories.js file)
        filtersObj // Desired filters (Created via the filtersCreator class)
    ) {
        this.category = category;
        this.filters = filtersObj;
    }
}

export class filtersCreator {
    constructor(
        saleBool, // Boolean
        brandsArr, // Array of strings EX: ["Nike", "Adidas", "Empyre"]
        colorsArr, // Array of strings EX: ["Red", "Blue", "Yellow"]
        priceRange, // Array with min & max usd values EX: [0, 100]
        bodyType // Array of strings EX: ["Men's", "Women's"]
    ) {
        const standardObject = (data) => {
            return { value: data };
        };
        if (brandsArr) {
            this[filterRef.brands.paramName] = standardObject(brandsArr);
        }
        if (colorsArr) {
            this[filterRef.colors.paramName] = standardObject(colorsArr);
        }
        if (saleBool) {
            this[filterRef.sale.paramName] = standardObject([
                filterRef.sale.true,
            ]);
        }
        if (priceRange) {
            const priceRangeArr = [
                {
                    min: priceRange[0],
                    max: priceRange[1],
                },
            ];
            this[filterRef.priceRange.paramName] =
                standardObject(priceRangeArr);
        }
        if (bodyType) {
            this[filterRef.bodyTypes.paramName] = standardObject(bodyType);
        }
    }
}
