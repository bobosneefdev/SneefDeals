import * as filterRef from "../objects/sdZMZ_filters.js";

export class filtersCreator {
    constructor(
        saleBool, // Boolean to show only "Sale" items
        brandsArr, // Array of strings EX: ["Nike", "Adidas", "Empyre"]
        colorsArr, // Array of strings EX: ["Red", "Blue", "Yellow"]
        priceRange, // Array with min & max usd values EX: [0, 100]
        bodyTypes // Array of strings EX: ["Men's", "Women's"]
    ) {
        const standardObject = (data) => {
            return { value: data };
        };
        if (brandsArr.length) {
            this[filterRef.brands.paramName] = standardObject(brandsArr);
        }
        if (colorsArr.length) {
            this[filterRef.colors.paramName] = standardObject(colorsArr);
        }
        if (saleBool.length) {
            this[filterRef.sale.paramName] = standardObject([
                filterRef.sale.true,
            ]);
        }
        if (priceRange.length) {
            const priceRangeArr = [
                {
                    min: priceRange[0],
                    max: priceRange[1],
                },
            ];
            this[filterRef.priceRange.paramName] =
                standardObject(priceRangeArr);
        }
        if (bodyTypes.length) {
            this[filterRef.bodyTypes.paramName] = standardObject(bodyTypes);
        }
    }
}