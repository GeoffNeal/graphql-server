import { useQuery, gql } from "@apollo/client";
import { styled } from "styled-components";

// Components
import Display, { DisplayItem } from "../components/Display";

const query = gql`
  {
    customers {
      forename
      surname
    }
  }
`;

const Name = styled.p`
  width: 100%;
  text-align: center;
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
          <Name>
            {customer.forename} {customer.surname}
          </Name>
        </DisplayItem>
      ))}
    </Display>
  );
}
