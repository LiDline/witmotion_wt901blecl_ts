import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./Menu.css";
import { useApplication } from "./ApplicationProvider";


// Переключатель степеней свободы (6 и 9 DOF)
export default function AlgorithmTransition() {
  const { writeOnDevice } = useApplication(); // Берём методы объекта Application

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
      >
        <FormControlLabel
          onClick={() => writeOnDevice("6 DOF")}
          value="6 DOF"
          control={<Radio />}
          label="6 DOF"
        />
        <FormControlLabel
          onClick={() => writeOnDevice("9 DOF")}
          value="9 DOF"
          control={<Radio />}
          label="9 DOF"
        />
      </RadioGroup>
    </FormControl>
  );
}
