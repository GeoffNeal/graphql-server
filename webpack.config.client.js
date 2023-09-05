import { resolve as _resolve } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";

const __dirname = new URL(".", import.meta.url).pathname;

/*We are basically telling webpack to take index.js from entry. Then check for all file extensions in resolve. 
After that apply all the rules in module.rules and produce the output and place it in main.js in the public folder.*/
const config = {
  mode: "development",
  entry: _resolve(__dirname, "client/index.tsx"),
  output: {
    /** "path"
     * the folder path of the output file
     */
    path: _resolve(__dirname, "dist/client/public"),
    publicPath: "/public/",
    /** "filename"
     * the name of the output file
     */
    filename: "client.bundle.js",
  },
  target: "web",
  resolve: {
    /** "extensions"
     * If multiple files share the same name but have different extensions, webpack will
     * resolve the one with the extension listed first in the array and skip the rest.
     * This is what enables users to leave off the extension when importing
     */
    extensions: [".ts", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./client/index.html",
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: "./client/styles.global.css", to: "styles.global.css" },
    //   ],
    // }),
    new MiniCssExtractPlugin(),
  ],
};

export default config;
