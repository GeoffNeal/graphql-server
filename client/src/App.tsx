import { useQuery, gql } from "@apollo/client";

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
      <h3>{JSON.stringify(data)}</h3>
    </main>
  );
};

export default App;
