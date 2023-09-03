import { Outlet, NavLink } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: stretch;
  padding: 1rem;
  min-height: calc(100vh - 2rem);
  background: linear-gradient(#efefef, #cdcdcd);
`;

const OuterContainer = styled.div`
  display: flex;
  width: 80%;
  border: 1px solid #f6f6f6;
  border-radius: 10px;
  background-color: #fff;
`;

const InnerContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

const SideDrawer = styled.div`
  width: 15%;
  padding: 1rem;
  background-color: #f7f7f7;
  border-right: 1px solid #e4e4e4;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Link = styled(NavLink)`
  color: green;

  &.active {
    color: yellow;
  }
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
