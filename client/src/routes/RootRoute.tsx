import { Outlet } from "react-router-dom";
import styled from "styled-components";

// Components
import Link from "../components/Link.js";
import SideDrawer from "../components/SideDrawer.js";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: var(--default-padding);
  min-height: 100vh;
  background: linear-gradient(var(--grey-lighter), var(--grey-light));
`;

const OuterContainer = styled.div`
  display: flex;
  width: 80%;
  border-radius: var(--default-border-radius);
  background-color: var(--white);
`;

const InnerContainer = styled.div`
  width: 100%;
  padding: var(--default-padding);
`;

export default function RootRoute() {
  return (
    <Main>
      <OuterContainer>
        <SideDrawer>
          <nav>
            <ul>
              <li>
                <Link to={`/`}>Home</Link>
              </li>
              <li>
                <Link to={`products`}>Products</Link>
              </li>
              <li>
                <Link to={`customers`}>Customers</Link>
              </li>
              <li>
                <Link to={`create`}>Create</Link>
              </li>
            </ul>
          </nav>
        </SideDrawer>
        <InnerContainer>
          <Outlet />
        </InnerContainer>
      </OuterContainer>
    </Main>
  );
}
