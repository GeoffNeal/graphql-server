import path from "path";
import express from "express";

const port = process.env.WEBSERVER_PORT || 8080;
const app = express();

const indexPath = path.resolve(process.cwd(), "dist/client/public/index.html");
const publicPath = express.static(
  path.resolve(process.cwd(), "dist/client/public")
);

app.use("/public", publicPath);

// Send the index path for all pages because React Router
// will then use client-side routing to redirect to the correct page
app.get("/*", function (_, res) {
  res.sendFile(indexPath);
});

app.listen(port, function () {
  console.log(`🚀  Web server ready at http://localhost:${port}`);
});
