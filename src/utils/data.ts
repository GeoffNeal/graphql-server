import fs from "fs";
import csvParser from "csv-parser";

/** Reads a csv file.
 * Converts it into a json object
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
