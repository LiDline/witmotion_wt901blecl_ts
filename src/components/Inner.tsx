import { Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import CsvDownloader from "react-csv-downloader";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useApplication } from "../components/ApplicationProvider";
import { ArraySensorDataInterface, columns } from "../functions/Interfaces";
import { SwitchSelector } from "../components/Switch";
import { Graphs } from "../components/Graphs";
import { dataFlowRestriction } from "../functions/DataFlowRestriction";
import BasicMenu from "./MenuSettings";


export const Inner: React.FC = () => {
      // для графиков
  const inputDataInit = {
    axc: { x: [], y: [], z: [] },
    vel: { x: [], y: [], z: [] },
    ang: { x: [], y: [], z: [] },
    counter: [0],
  };
  // Для .csv
  const csvInit = [
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
  ];

  // Берём методы объекта Application
  const { connect, disconnect } = useApplication();
  // Переключение кнопок
  const [disabled, setDisabled] = useState<boolean>(true);
  const [inputData, setInputData] =
    useState<ArraySensorDataInterface>(inputDataInit);
  const [csv, setCsv] = useState(csvInit);
  // Для изменения цвета. Если убрать any начнётся говнофонтан из ошибок типов
  const buttonLogic: any = [
    ["error", "Disconnect & Save Data"],
    ["success", "Connect"],
  ];

  return(
    <>
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
              connect((data) => {
                // Отправляем изменения
                setInputData(dataFlowRestriction(inputData, data));
                setDisabled(!disabled);
                // Сохраним все данные для csv
                csv.push({
                  1: String(
                    inputData.counter[inputData.counter.length - 1]
                  ),
                  2: String(data.acceleration.x),
                  3: String(data.acceleration.y),
                  4: String(data.acceleration.z),
                  5: String(data.angularVelocity.x),
                  6: String(data.angularVelocity.y),
                  7: String(data.angularVelocity.z),
                  8: String(data.corners.x),
                  9: String(data.corners.y),
                  10: String(data.corners.z),
                });
                setCsv(csv);
              });
            } else {
              disconnect();
              setDisabled(!disabled);
              setCsv(csvInit);
              setInputData(inputDataInit);
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
  </>
  )
}