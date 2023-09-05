import { useState } from "react";

// Components
import Create from "./Create";
import { TextField } from "./Input";
import { FormCol, FormRow } from "./Form";
import Button from "./Button";

// Graphql
import { createProductMutation } from "../graphql/mutations";

export default function CreateProduct() {
  const [formValues, setFormValues] = useState<Product>({
    vin: "",
    make: "",
    model: "",
    colour: "",
    price: 0,
  });

  return (
    <Create
      mutation={createProductMutation}
      variables={{ product: formValues }}
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

          // Need to make sure the price is a number to send it to the
          // server (not an ideal solution but I'm out of time :P)
          const finalValue = name === "price" ? parseInt(value, 10) : value;

          setFormValues((prevState) => ({ ...prevState, [name]: finalValue }));
        };

        return (
          <>
            <FormCol>
              <FormRow>
                <TextField
                  label="Make"
                  onChange={handleChange}
                  name="make"
                  id="make"
                  value={formValues.make}
                />
                <TextField
                  label="Model"
                  onChange={handleChange}
                  name="model"
                  id="model"
                  value={formValues.model}
                />
              </FormRow>
              <TextField
                label="Vin"
                onChange={handleChange}
                name="vin"
                id="vin"
                value={formValues.vin}
              />
              <TextField
                label="Colour"
                onChange={handleChange}
                name="colour"
                id="colour"
                value={formValues.colour}
              />
              <TextField
                label="Price"
                onChange={handleChange}
                name="price"
                id="price"
                value={formValues.price}
                type="number"
              />
            </FormCol>

            <Button onClick={handleClick}>Create</Button>
          </>
        );
      }}
    </Create>
  );
}
