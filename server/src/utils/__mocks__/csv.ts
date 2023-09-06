// Stubs
import { productListStub } from "../../../stubs/product";
import { customerListStub } from "../../../stubs/customer";

export const readCSV = jest.fn((type: EntityType = "product"): Entity[] =>
  type === "product" ? productListStub : customerListStub
);
