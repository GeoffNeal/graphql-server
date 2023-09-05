import { useState } from "react";
import { useMutation, MutationFunction } from "@apollo/client";
import { DocumentNode } from "graphql";
import styled from "styled-components";

// Components
import Form from "./Form";

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--default-padding);
`;

type CreateProps = {
  mutation: DocumentNode;
  variables: { [key: string]: Entity };
  children: ({
    mutate,
    complete,
    error,
  }: {
    mutate: MutationFunction;
    complete: boolean;
    error: boolean;
  }) => React.ReactNode;
};

export default function Create({ mutation, variables, children }: CreateProps) {
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState(false);
  const [mutate] = useMutation(mutation, {
    variables,
    onCompleted: () => {
      setComplete(true);
    },
    onError: () => {
      setError(true);
    },
  });

  return (
    <div>
      <Form>{children({ mutate, complete, error })}</Form>
      <Message>
        {complete ? <b>Success!</b> : null}
        {error ? <b>Something went wrong</b> : null}
      </Message>
    </div>
  );
}
