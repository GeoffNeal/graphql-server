import { useQuery, gql } from "@apollo/client";

import MyComponent from "./components/MyComponent.js";

const query = gql`
  {
    products {
      make
      model
    }
  }
`;

const App = () => {
  const { data } = useQuery(query);
  return (
    <main>
      <h1>Hello world</h1>
      <MyComponent>{JSON.stringify(data)}</MyComponent>
    </main>
  );
};

export default App;
