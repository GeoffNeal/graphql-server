import fs from "fs";
import csvParser from "csv-parser";
import { stringify } from "csv-stringify/sync";

// Utils
import { getFilePath } from "./general";

/**
 * Converts the contents of a specified .csv file to JSON
 *
 * @param filepath The path to the .csv file that you want to convert to JSON
 * @returns A Promise that resolves to an array containing the rows of the .csv
 */
export const readCSV = async <T>(filepath: string): Promise<T[]> => {
  const fp = getFilePath(filepath);

  return await new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(fp, { encoding: "utf-8" })
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};

/**
 * Take an object and write it as the last row in a csv file
 *
 * @param filepath The path to the csv file
 * @param data The item you want to add to the last row
 */
export const writeCSV = async <T>(filepath: string, data: T): Promise<void> => {
  // Convert object into csv string
  const createCsvRow = (obj: T, headers = false) =>
    Object.entries(obj).map(([key, value]) =>
      // If headers is specified then return the column keys instead of the values
      headers ? `${key}` : `${value}`
    );

  // Get the current contents of the csv file so that we
  // don't overwrite it.
  // NOTE: This is not great for large CSV files
  const csvContents = (await readCSV<T>(filepath)).map((row) =>
    createCsvRow(row)
  );

  // Add new entry to the end
  csvContents.push(createCsvRow(data));

  // Add headers to the start
  csvContents.unshift(createCsvRow(data, true));

  try {
    const output = stringify(csvContents);
    fs.writeFileSync(filepath, output);
  } catch (err) {
    console.error(err);
  }
};
