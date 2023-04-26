import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MenuItem } from "@mui/material";
import CsvDownloader from "react-csv-downloader";
import { columns } from "../functions/Interfaces";

export interface CsvInitInterface {
  [key: string]: string;
}
interface DownloadCsvInterface {
  data: CsvInitInterface[][];
}

// Содержание кнопки Settings
export const DownloadCsv: React.FC<DownloadCsvInterface> = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Download results
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
        {data.map((data, i) => {
          return (
            <div key={i}>
              <CsvDownloader
                filename="res"
                extension=".csv"
                separator=","
                wrapColumnChar="'"
                columns={columns}
                datas={data}
              >
                <MenuItem key={i}>Result {i + 1}</MenuItem>
              </CsvDownloader>
            </div>
          );
        })}
      </Menu>
    </div>
  );
};
