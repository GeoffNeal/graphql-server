import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes
import RootRoute from "./routes/RootRoute.js";
import HomeRoute from "./routes/HomeRoute.js";
import ProductsRoute from "./routes/ProductsRoute.js";
import CustomersRoute from "./routes/CustomersRoute.js";
import ErrorRoute from "./routes/ErrorRoute.js";

// Styles
import "../styles.global.css";

const client = new ApolloClient({
  uri: "http://127.0.0.1:4000",
  cache: new InMemoryCache(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
      },
      {
        path: "/products",
        element: <ProductsRoute />,
      },
      {
        path: "/customers",
        element: <CustomersRoute />,
      },
    ],
  },
]);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

export default App;
