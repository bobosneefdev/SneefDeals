import * as filterReference from "../constants/filters.js";

export class ZumiezApiFilters {
    constructor(
        saleBool, // Boolean to show only "Sale" items
        brandsArr, // Array of strings EX: ["Nike", "Adidas", "Empyre"]
        colorsArr, // Array of strings EX: ["Red", "Blue", "Yellow"]
        priceRange, // Array with min & max usd values EX: [0, 100]
        bodyTypes // Array of strings EX: ["Men's", "Women's"]
    ) {
        // Take our desired item query parameters, and format them into the Zumiez API's expected format
        const standardObject = (data) => {
            return { value: data };
        };
        if (brandsArr.length) {
            this[filterReference.brands.paramName] = standardObject(brandsArr);
        }
        if (colorsArr.length) {
            this[filterReference.colors.paramName] = standardObject(colorsArr);
        }
        if (saleBool) {
            this[filterReference.sale.paramName] = standardObject([
                filterReference.sale.true,
            ]);
        }
        if (priceRange.length) {
            const priceRangeArr = [
                {
                    min: priceRange[0],
                    max: priceRange[1],
                },
            ];
            this[filterReference.priceRange.paramName] =
                standardObject(priceRangeArr);
        }
        if (bodyTypes.length) {
            this[filterReference.bodyTypes.paramName] = standardObject(bodyTypes);
        }
    }
}
