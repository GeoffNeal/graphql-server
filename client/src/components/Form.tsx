import styled from "styled-components";

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: var(--default-padding);
  border: var(--light-border);
  border-radius: var(--default-border-radius);
  background-color: var(--white);
`;

/**
 * For use when you need multiple inputs
 * on the same row.
 */
export const FormRow = styled.div`
  display: flex;
`;

export const FormCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Form;
