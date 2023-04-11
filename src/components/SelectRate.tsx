import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const rateList = [0.2, 0.5, 1, 2, 5, 10, 20, 50];

export default function RateSelect() {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Rate
        </InputLabel>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: "age",
            id: "uncontrolled-native",
          }}
        >
          {rateList.map((x) => {
            return <option value={x}>{x}</option>;
          })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
