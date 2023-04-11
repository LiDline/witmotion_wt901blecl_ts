import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./Menu.css";

export default function AlgorithmTransition() {
  const [value, setValue] = React.useState("9 DOF");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label" className="Menu">
        Algorithm transition
      </FormLabel>
      <RadioGroup
        className="Menu"
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="6 DOF" control={<Radio />} label="6 DOF" />
        <FormControlLabel value="9 DOF" control={<Radio />} label="9 DOF" />
      </RadioGroup>
    </FormControl>
  );
}
