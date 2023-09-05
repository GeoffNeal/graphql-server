import { Outlet } from "react-router-dom";
import styled from "styled-components";

// Components
import Link from "../components/Link";

const List = styled.ul`
  display: flex;
  margin-bottom: var(--default-margin);
`;

export default function CreateRoute() {
  return (
    <div>
      <nav>
        <List>
          <li>
            <Link to={`customer`}>Create Customer</Link>
          </li>
          <li>
            <Link to={`product`}>Create Product</Link>
          </li>
        </List>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
