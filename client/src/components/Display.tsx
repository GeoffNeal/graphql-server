import styled from "styled-components";

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const Item = styled.li`
  margin: var(--default-margin);
  width: calc(100% / 3 - 2rem);
`;

const Image = styled.div<{ src?: string }>`
  width: 100%;
  height: 200px;
  background: url(${({ src }) => src}) center center / cover;
`;

const Details = styled.div`
  display: flex;
  padding: var(--default-padding);
  background-color: var(--grey-lighter);
`;

// Wrap each child in one of these
export function DisplayItem({ imgSrc, children }) {
  return (
    <Item>
      <Image src={imgSrc} />
      <Details>{children}</Details>
    </Item>
  );
}

export default function Display({ children }) {
  return <List>{children}</List>;
}
