import { Button, ButtonGroup } from "@mui/material";
import { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import CsvDownloader from "react-csv-downloader";
import "./App.css";

import { useApplication } from "./components/ApplicationProvider";
import { ArraySensorDataInterface, columns } from "./functions/interfaces";
import { SwitchSelector } from "./components/Switch";
import { Graphs } from "./components/Graphs";
import { dataFlowRestriction } from "./functions/dataFlowRestriction";
import BasicMenu from "./components/Menu";

function App() {
  const { connectToDevices, disconnectToDevices } = useApplication(); // Берём методы объекта Application
  const [disabled, setDisabled] = useState<boolean>(true); // Переключение кнопок
  const [inputData, setInputData] = useState<ArraySensorDataInterface>({
    // для графиков
    axc: { x: [], y: [], z: [] },
    vel: { x: [], y: [], z: [] },
    ang: { x: [], y: [], z: [] },
    counter: [0],
  });
  const [csv, setCsv] = useState([
    // Для .csv
    {
      1: "0",
      2: "0",
      3: "0",
      4: "0",
      5: "0",
      6: "0",
      7: "0",
      8: "0",
      9: "0",
      10: "0",
    },
  ]);
  const buttonLogic: any = [
    // Для изменения цвета. Если убрать any начнётся говнофонтан из ошибок типов
    ["error", "Disconnect & Save Data"],
    ["success", "Connect"],
  ];

  return (
    <div className="App">
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <h1 className="App-header">WT901BLE reader</h1>
        </Grid2>
        <Grid2 xs={6}>
          <ButtonGroup>
            <CsvDownloader
              filename="res"
              extension=".csv"
              separator=","
              wrapColumnChar="'"
              columns={columns}
              datas={csv}
              disabled={disabled}
            >
              <Button
                onClick={() => {
                  // стрелочная/лямбда ожидает на вход данные.
                  // В connectToDevices мы передаём именно сигнатуру функции, а не саму функцию
                  if (disabled) {
                    connectToDevices((data) => {
                      // Отправляем изменения
                      setInputData(dataFlowRestriction(inputData, data));
                      setDisabled(!disabled);
                      // Сохраним все данные для csv
                      csv.push({
                        1: String(
                          inputData.counter[inputData.counter.length - 1]
                        ),
                        2: String(data.axc.x),
                        3: String(data.axc.y),
                        4: String(data.axc.z),
                        5: String(data.vel.x),
                        6: String(data.vel.y),
                        7: String(data.vel.z),
                        8: String(data.ang.x),
                        9: String(data.ang.y),
                        10: String(data.ang.z),
                      });
                      setCsv(csv);
                    });
                  } else {
                    disconnectToDevices();
                    setDisabled(!disabled);
                  }
                }}
                variant="contained"
                color={buttonLogic[Number(disabled)][0]}
                children={buttonLogic[Number(disabled)][1]}
              />
            </CsvDownloader>
            <BasicMenu dis={disabled} />
          </ButtonGroup>
        </Grid2>
        <Grid2 xs={6}>
          <SwitchSelector /> {/*Выбор девайса */}
        </Grid2>
        <Grid2 xs={12}>
          {!disabled && <Graphs inputData={inputData} />} {/* Графики */}
        </Grid2>
      </Grid2>
    </div>
  );
}

export default App;
