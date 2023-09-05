import * as React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes
import RootRoute from "./routes/RootRoute";
import HomeRoute from "./routes/HomeRoute";
import ProductsRoute from "./routes/ProductsRoute";
import CustomersRoute from "./routes/CustomersRoute";
import CreateRoute from "./routes/CreateRoute";
import CreateRootRoute from "./routes/CreateRootRoute";
import CreateCustomerRoute from "./routes/CreateCustomerRoute";
import CreateProductRoute from "./routes/CreateProductRoute";
import ErrorRoute from "./routes/ErrorRoute";

// Styles
import "../public/styles.global.css";

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
      {
        path: "/create",
        element: <CreateRoute />,
        children: [
          {
            path: "/create",
            element: <CreateRootRoute />,
          },
          {
            path: "/create/customer",
            element: <CreateCustomerRoute />,
          },
          {
            path: "/create/product",
            element: <CreateProductRoute />,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </React.StrictMode>
  );
}
