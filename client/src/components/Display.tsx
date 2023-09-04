import styled from "styled-components";

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

export const Item = styled.li`
  margin: 1rem;
  width: calc(100% / 3 - 2rem);
`;

const Image = styled.div<{ src?: string }>`
  width: 100%;
  height: 200px;
  background: url(${({ src }) => src}) center center / cover;
`;

const Details = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #f7f7f7;
`;

// Wrap each child in one of these
export const DisplayItem = ({ imgSrc, children }) => {
  return (
    <Item>
      <Image src={imgSrc} />
      <Details>{children}</Details>
    </Item>
  );
};

export default function Display({ children }) {
  return <List>{children}</List>;
}
