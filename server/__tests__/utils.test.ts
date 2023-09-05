import path from "path";
import { readCSV } from "../src/utils/csv";

jest.mock("../src/utils/general");

test("reads from a csv file", async () => {
  expect(
    await readCSV(path.resolve(process.cwd(), "data/product.csv"))
  ).toHaveLength(5);
});
