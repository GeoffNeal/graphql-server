import styled from "styled-components";

const Button = styled.button`
  font-family: var(--font-family);
  font-size: var(--font-size-md);
  width: 100%;
  padding: var(--default-padding);
  border: none;
  cursor: pointer;
  background-color: var(--brand-01-100);
  color: var(--off-white);
  transition: background-color var(--default-transition-time)
    var(--default-transition-type);

  &:hover {
    background-color: var(--brand-01-120);
  }

  &:disabled {
    background-color: var(--brand-01-10);
    cursor: not-allowed;
  }
`;

export default Button;
