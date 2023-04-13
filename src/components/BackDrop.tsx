import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { sleep } from "@amcharts/amcharts5/.internal/core/util/Time";
import { useApplication } from "./ApplicationProvider";
import MenuItem from "@mui/material/MenuItem";
import { BasicCard } from "./CardMagCal";

// Кнопка Accelerometer calibration
export function AccelerometerBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const { writeOnDevice } = useApplication(); // Берём методы объекта Application

  return (
    <div>
      <MenuItem
        onClick={async () => {
          writeOnDevice("accelerometer_calibration");
          handleOpen();
          await sleep(3100);
          handleClose();
        }}
      >
        Accelerometer calibration
      </MenuItem>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

// Кнопка Magnetometer calibration
export function MagnetometerBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const { writeOnDevice } = useApplication(); // Берём методы объекта Application

  return (
    <div>
      <MenuItem
        onClick={() => {
          handleOpen();
          writeOnDevice('magnetometer_calibration');
        }}
      >
        Magnetometer calibration
      </MenuItem>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <BasicCard  handleClose={handleClose}/>
      </Backdrop>
    </div>
  );
}
