import { Category } from "../model/Category";

export class SetCategories {
    static readonly type = '[SalesScreen] SetCategories';
    constructor(public payload: { categories: Category[], id: string}) { }
}