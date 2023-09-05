import { resolve as _resolve } from "path";

const __dirname = new URL(".", import.meta.url).pathname;

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/
const config = {
  mode: "development",
  entry: {
    server: _resolve(__dirname, "server/index.ts"),
    webserver: _resolve(__dirname, "server/application.ts"),
    seed: _resolve(__dirname, "server/src/db/seed.ts"),
  },
  output: {
    /** "path"
     * the folder path of the output file
     */
    path: _resolve(__dirname, "dist/server"),
    publicPath: "/dist/server/",
    /** "filename"
     * the name of the output file
     */
    filename: "[name].bundle.js",
    chunkFormat: "module",
  },
  experiments: {
    outputModule: true,
  },
  target: "node",
  resolve: {
    /** "extensions"
     * If multiple files share the same name but have different extensions, webpack will
     * resolve the one with the extension listed first in the array and skip the rest.
     * This is what enables users to leave off the extension when importing
     */
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  externals: ["express"],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
};

export default config;
