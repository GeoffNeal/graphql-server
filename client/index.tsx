import { createRoot } from "react-dom/client";

// App
import App from "./src/App.js";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
