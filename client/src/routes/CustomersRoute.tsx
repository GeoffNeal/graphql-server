import { useQuery, gql } from "@apollo/client";

// Components
import Display, { DisplayItem } from "../components/Display.js";

const query = gql`
  {
    customers {
      forename
      surname
      email
      contact_number
    }
  }
`;

export default function CustomersRoute() {
  const { data, loading } = useQuery(query);

  if (loading) return <h3>Loading...</h3>;

  return (
    <Display>
      {data.customers.map((customer) => (
        <DisplayItem
          key={customer.email}
          imgSrc={"https://picsum.photos/id/64/250/200?greyscale"}
        >
          <p>{customer.forename}</p>
          <p>{customer.surname}</p>
          <p>{customer.email}</p>
          <p>{customer.contact_number}</p>
        </DisplayItem>
      ))}
    </Display>
  );
}
