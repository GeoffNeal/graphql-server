import { resolve as _resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = new URL(".", import.meta.url).pathname;

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/
const config = {
  mode: "development",
  entry: _resolve(__dirname, "dist/client/index.js"),
  output: {
    /** "path"
     * the folder path of the output file
     */
    path: _resolve(__dirname, "dist/client"),
    publicPath: "/dist/client/",
    /** "filename"
     * the name of the output file
     */
    filename: "main.bundle.js",
  },
  target: "web",
  devServer: {
    /** "port"
     * port of dev server
     */
    port: "3000",
    /** "static"
     * This property tells Webpack what static file it should serve
     */
    static: ["./dist/client/public"],
    /** "open"
     * opens the browser after server is successfully started
     */
    open: true,
    /** "hot"
     * enabling and disabling HMR. takes "true", "false" and "only".
     * "only" is used if enable Hot Module Replacement without page
     * refresh as a fallback in case of build failures
     */
    hot: true,
    /** "liveReload"
     * disable live reload on the browser. "hot" must be set to false for this to work
     */
    liveReload: true,
  },
  resolve: {
    /** "extensions"
     * If multiple files share the same name but have different extensions, webpack will
     * resolve the one with the extension listed first in the array and skip the rest.
     * This is what enables users to leave off the extension when importing
     */
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "public/index.html",
      template: "./client/public/index.html",
    }),
  ],
};

export default config;
