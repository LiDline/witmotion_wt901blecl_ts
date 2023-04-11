import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AlgorithmTransition from "./RadioGroup";
import { Divider } from "@mui/material";
import RateSelect from "./SelectRate";

interface BasicMenuInterface{
    dis: boolean    // А почему dis: boolean не прокатывает?????
}

const BasicMenu = ({dis}: BasicMenuInterface) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const buttonLogic: any = ["contained", "outlined"] // для variant

  return (
    <div>
      <Button
        disabled={false}
        variant={buttonLogic[Number(dis)]}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Settings
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem disabled={true} onClick={handleClose}>Accelerometer calibration</MenuItem>
        <MenuItem disabled={true} onClick={handleClose}>Magnetometer calibration</MenuItem>
        <Divider />
        <MenuItem ><AlgorithmTransition/></MenuItem>
        <Divider />
        <MenuItem><RateSelect/></MenuItem>
      </Menu>
    </div>
  );
};

export default BasicMenu;
