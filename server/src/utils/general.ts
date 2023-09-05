/**
 * A workaround for replacing __dirname in modules
 *
 * @param fp The path to the module
 * @returns A URL instance
 */
export const getFilePath = (fp: string) => new URL(fp, import.meta.url);
