import * as React from "react";
import styled from "styled-components";
import classNames from "classnames";

// Components
import Form, { FormCol, FormRow } from "./Form";

// Utils
import { callAll } from "../utils";

const InputContainer = styled.div`
  width: 100%;
  position: relative;
  padding: var(--default-padding);
  isolation: isolate;

  /* ======================================
  FORM STYLES
  ====================================== */

  ${Form} & {
    margin-bottom: var(--default-margin);
  }

  ${Form} &,
  ${Form} & > input {
    border-radius: var(--default-border-radius);
  }

  ${FormRow} &,
  ${FormRow} & > input {
    border-radius: 0px;
  }

  ${FormRow} &:first-child,
  ${FormRow} &:first-child > input {
    border-top-left-radius: var(--default-border-radius);
    border-bottom-left-radius: var(--default-border-radius);
  }

  ${FormRow} &:last-child,
  ${FormRow} &:last-child > input {
    border-top-right-radius: var(--default-border-radius);
    border-bottom-right-radius: var(--default-border-radius);
  }

  ${FormRow} &:not(:last-child),
  ${FormRow} &:not(:last-child) > input:not(:focus) {
    border-right: none;
  }

  ${FormCol} &,
  ${FormCol} & > input {
    border-radius: 0px;
  }

  ${FormCol} &:first-child,
  ${FormCol} &:first-child > input {
    border-top-left-radius: var(--default-border-radius);
    border-top-right-radius: var(--default-border-radius);
  }

  ${FormCol} &:last-child,
  ${FormCol} &:last-child > input {
    border-bottom-left-radius: var(--default-border-radius);
    border-bottom-right-radius: var(--default-border-radius);
  }

  ${FormCol} &:not(:last-child),
  ${FormCol} &:not(:last-child) > input {
    border-bottom: none;
    margin-bottom: 0;
  }

  ${FormCol} ${FormRow} &,
  ${FormCol} ${FormRow} & > input {
    border-radius: 0px;
    margin-bottom: 0;
  }

  ${FormCol} ${FormRow}:first-child &,
  ${FormCol} ${FormRow}:first-child & > input {
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }

  ${FormCol} ${FormRow}:first-child &:first-child,
  ${FormCol} ${FormRow}:first-child &:first-child > input {
    border-top-left-radius: var(--default-border-radius);
  }

  ${FormCol} ${FormRow}:first-child &:last-child,
  ${FormCol} ${FormRow}:first-child &:last-child > input {
    border-top-right-radius: var(--default-border-radius);
  }

  ${FormCol} ${FormRow}:last-child &,
  ${FormCol} ${FormRow}:last-child & > input {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    margin-bottom: var(--default-margin);
  }

  ${FormCol} ${FormRow}:last-child &:not(:last-child),
  ${FormCol} ${FormRow}:last-child &:not(:last-child) > input {
    margin-bottom: var(--default-margin);
  }

  ${FormCol} ${FormRow}:last-child &:not(:last-child) > input {
    border-bottom: var(--default-border);
  }

  ${FormCol} ${FormRow}:last-child &:first-child,
  ${FormCol} ${FormRow}:last-child &:first-child > input {
    border-bottom-left-radius: var(--default-border-radius);
  }

  ${FormCol} ${FormRow}:last-child &:last-child,
  ${FormCol} ${FormRow}:last-child &:last-child > input {
    border-bottom-right-radius: var(--default-border-radius);
  }

  ${FormCol} ${FormRow}:not(:last-child) &,
  ${FormCol} ${FormRow}:not(:last-child) & > input {
    border-bottom: none;
  }
`;

const BaseInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: var(--default-border);
  padding: 0;
  margin: 0;
  height: 100%;
  padding-left: inherit;

  &:focus {
    outline-color: var(--brand-01-10);
  }

  &:invalid {
    outline-color: var(--color-error);
  }
`;

const InputWithLabel = styled(BaseInput)`
  padding: var(--default-padding) 0 0 0;
  padding-left: inherit;
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  z-index: 1;
  pointer-events: none;
  transform: none;
  color: var(--color-text-muted);
  background-color: inherit;
  font-size: var(--font-size-xxs);
  transform: scale(1.3);
  transform-origin: bottom left;
  transition: transform 0.2s cubic-bezier(0, 0, 0.2, 1);

  ${InputWithLabel}:focus + &,
  ${InputWithLabel}.hold-label + &,
  ${InputWithLabel}:autofill + &,
  ${InputWithLabel}:-webkit-autofill + & {
    color: var(--brand-01-100);
    transform: translate(0px, -0.7rem) scale(1);
  }
`;

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const TextField: React.FC<TextFieldProps> = ({
  label,
  id,
  onBlur,
  ...props
}) => {
  // Ensure the label points to the input with the same id.
  if (label && !id) {
    throw new Error("Please provide an id for the TextField");
  }
  const [shouldHoldLabel, setShouldHoldLabel] = React.useState(false);
  const classes = classNames(props.className, {
    // On blur, if there is user input then we want to keep the label hovering.
    "hold-label": shouldHoldLabel,
  });

  const Input = label ? InputWithLabel : BaseInput;

  const handleBlur: React.EventHandler<React.FocusEvent<HTMLInputElement>> = (
    e
  ) => {
    // On blur, if there is user input then we want to keep the label hovering.
    if (e.target.value.length >= 1) {
      setShouldHoldLabel(true);
    } else {
      setShouldHoldLabel(false);
    }
  };

  return (
    <InputContainer>
      <Input
        id={id}
        className={classes}
        onBlur={callAll<React.FocusEvent<HTMLInputElement>>(handleBlur, onBlur)}
        {...props}
      />
      <Label htmlFor={id}>{label}</Label>
    </InputContainer>
  );
};
