import { optsCreator, filtersCreator } from "../objects/sdZMZ_optsCreator.js";
import * as filterRef from "../objects/sdZMZ_filters.js";
import { categories } from "../objects/sdZMZ_categories.js";

export function getOptionsRoutine(saleBool) {
    const routine = [];

    //MENS
    ////TOPS
    //////TSHIRTS
    const mensTShirtsFilters = new filtersCreator(
        saleBool,
        false,
        false,
        false,
        false
    );
    const mensTShirtsCategory = categories.mens.tops.tshirts;

    routine.push(new optsCreator(mensTShirtsCategory, mensTShirtsFilters));

    return routine;
}
