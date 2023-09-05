import path from "path";
import { readCSV } from "../../../../server/src/utils/csv.ts";

jest.mock("../../../../server/src/utils/general.ts");

test("adds 1 + 2 to equal 3", async () => {
  expect(
    await readCSV(path.resolve(process.cwd(), "data/product.csv"))
  ).toHaveLength(5);
});
