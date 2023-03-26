import { Categories } from "../model/categories";

export class SetCategories {
    static readonly type = '[SalesScreen] SetCategories';
    constructor(public payload: { categories: Categories[], id: string}) { }
}