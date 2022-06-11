import * as React from "react";
import Radio from "@mui/material/Radio";

export default function RadioButtons({ value, name, label }) {
  const [selectedValue, setSelectedValue] = React.useState(value);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Radio
        checked={selectedValue === "y"}
        onChange={handleChange}
        value={selectedValue}
        name={name}
        label={label}
        inputProps={{ "aria-label": "A" }}
      />
    </div>
  );
}
