import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Components
import SideDrawer from "./SideDrawer.js";

const Link = styled(NavLink)`
  padding: var(--default-padding);
  width: 100%;
  display: inline-block;
  color: var(--white);
  background-color: var(--brand-01-10);
  border-right: 0px solid var(--brand-01-140);
  transition: border-right-width 0.1s linear;

  ${SideDrawer} ul li:first-child & {
    border-top-left-radius: var(--default-border-radius);
  }

  &:hover,
  &.active {
    background-color: var(--brand-01-100);
    border-right-width: 5px;
  }
`;

export default Link;
