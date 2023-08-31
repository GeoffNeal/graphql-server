import fs from "fs";
import csvParser from "csv-parser";

/**
 * Converts the contents of a specified .csv file to JSON
 *
 * @param filepath The path to the .csv file that you want to convert to JSON
 * @returns A Promise that resolves to an array of the contents of the .csv
 */
export const readCSV = async <T>(filepath: string): Promise<T[]> => {
  const fp = new URL(filepath, import.meta.url);

  return await new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(fp, { encoding: "utf-8" })
      .pipe(csvParser())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};
