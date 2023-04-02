import { Category } from "./Category";
import { Variant } from "./Variant";

export class Product {
  public type!: string;

  public id!: number;

  public categoryId!: number;

  public Files!: Array<string>;

  public name!: string;

  public userId!: string;

  public ProductVariants!: Array<Variant>;

  public description!: string;

  public Category!: Category;
}
