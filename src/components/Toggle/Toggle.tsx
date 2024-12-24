import React, { useState } from "react";
import Form from "react-bootstrap/esm/Form";

interface ToggleProps {
  id?: string;
  initialValue?: boolean;
  onLabel?: string;
  offLabel?: string;
  description?: string;
  className?: string;
  type?: "checkbox" | "radio" | "switch";
  onChange?: (value: boolean) => void;
}

export const Toggle = React.forwardRef((props: ToggleProps, ref) => {
  const { id, initialValue, description, onChange } = props;
  const [checked, setChecked] = useState<boolean>(initialValue!);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (onChange) onChange(isChecked);
  };

  return (

    <Form.Group controlId={id} className={props.className}>
      <Form.Check type={props.type} className="d-flex align-items-center px-0">
      <Form.Check.Label>{description}</Form.Check.Label>
        <Form.Check.Input
          onChange={handleChange}
          checked={checked}
          className="fs-3 ms-2 mt-0 me-2"
        ></Form.Check.Input>
      </Form.Check>
    </Form.Group>

  );
});

Toggle.defaultProps = {
  initialValue: false,
  onLabel: "On",
  offLabel: "Off",
  type: "switch",
};

export default Toggle;


