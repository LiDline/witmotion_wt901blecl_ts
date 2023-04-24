import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2

import "./App.css";

import { Header } from "./components/Header";
import { Inner } from "./components/Inner";

function App() {
  return (
    <div className="App">
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Header />
        </Grid2>
        <Inner />
      </Grid2>
    </div>
  );
}

export default App;
