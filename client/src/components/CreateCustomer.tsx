import { useState } from "react";
import { gql } from "@apollo/client";

// Components
import Create from "./Create";
import { TextField } from "./Input";
import { FormCol, FormRow } from "./Form";
import Button from "./Button";

/**
 * Mutation to create a new customer
 */
const createCustomerMutation = gql`
  mutation CreateCustomer($customer: CustomerInput!) {
    addCustomer(customer: $customer)
  }
`;

export default function CreateCustomer() {
  const [formValues, setFormValues] = useState<Customer>({
    email: "",
    forename: "",
    surname: "",
    contact_number: "",
    postcode: "",
  });

  return (
    <Create
      mutation={createCustomerMutation}
      variables={{ customer: formValues }}
    >
      {({ mutate }) => {
        const handleClick: React.EventHandler<
          React.MouseEvent<HTMLButtonElement>
        > = (e) => {
          e.preventDefault();
          mutate();
        };

        const handleChange: React.EventHandler<
          React.ChangeEvent<HTMLInputElement>
        > = (e) => {
          const { name, value } = e.target;
          setFormValues((prevState) => ({ ...prevState, [name]: value }));
        };

        return (
          <>
            <FormCol>
              <FormRow>
                <TextField
                  label="First Name"
                  onChange={handleChange}
                  name="forename"
                  id="forename"
                  value={formValues.forename}
                />
                <TextField
                  label="Last Name"
                  onChange={handleChange}
                  name="surname"
                  id="surname"
                  value={formValues.surname}
                />
              </FormRow>
              <TextField
                type="email"
                label="Email"
                onChange={handleChange}
                name="email"
                id="email"
                value={formValues.email}
              />
              <TextField
                label="Phone"
                onChange={handleChange}
                name="contact_number"
                id="contact_number"
                value={formValues.contact_number}
              />
              <TextField
                label="Postcode"
                onChange={handleChange}
                name="postcode"
                id="postcode"
                value={formValues.postcode}
              />
            </FormCol>

            <Button onClick={handleClick}>Create</Button>
          </>
        );
      }}
    </Create>
  );
}
