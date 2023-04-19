import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useApplication } from "./ApplicationProvider";

interface MagnetometerBackdropInterface {
  handleClose: () => void;
}


// Карточка с объяснениями по калибровке магнитометра
export const BasicCard: React.FC<MagnetometerBackdropInterface> = ({
  handleClose,
}) => {
  const { writeOnDevice } = useApplication(); // Берём методы объекта Application

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Magnetometer calibration
        </Typography>
        <br />
        <Typography variant="body2">
          To calibrate the magnetometer, it is necessary to rotate the sensor
          along EACH axis (starting with OZ) by 360 degrees 3 times.
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            handleClose();
            writeOnDevice('exit_calibration_mode');
          }}
        >
          Close
        </Button>
      </CardActions>
    </Card>
  );
};
