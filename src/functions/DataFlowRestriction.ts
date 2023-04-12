import { SensorData } from "./ExtractDataFromRaw";
import { ArraySensorDataInterface } from "./Interfaces";


export const dataFlowRestriction = (
  inputData: ArraySensorDataInterface,
  data: SensorData
) => {
  // Пусть на экране всегда будет 50 точек
  if (inputData.ang.x.length >= 50) {
    // Ускорение
    inputData.axc.x.splice(0, 1);
    inputData.axc.y.splice(0, 1);
    inputData.axc.z.splice(0, 1);

    // Угл. скорость
    inputData.vel.x.splice(0, 1);
    inputData.vel.y.splice(0, 1);
    inputData.vel.z.splice(0, 1);

    // Угол
    inputData.ang.x.splice(0, 1);
    inputData.ang.y.splice(0, 1);
    inputData.ang.z.splice(0, 1);

    // Время
    inputData.counter.splice(0, 1);
  }

  // Добавляем данные
  // Ускорение
  inputData.axc.x.push(data.axc.x);
  inputData.axc.y.push(data.axc.y);
  inputData.axc.z.push(data.axc.z);

  // Угл. скорость
  inputData.vel.x.push(data.vel.x);
  inputData.vel.y.push(data.vel.y);
  inputData.vel.z.push(data.vel.z);

  // Угол
  inputData.ang.x.push(data.ang.x);
  inputData.ang.y.push(data.ang.y);
  inputData.ang.z.push(data.ang.z);

  // Время
  inputData.counter.push(inputData.counter[inputData.counter.length - 1] + 1);

  return {
    axc: {
      x: inputData.axc.x,
      y: inputData.axc.y,
      z: inputData.axc.z,
    },
    vel: {
      x: inputData.vel.x,
      y: inputData.vel.y,
      z: inputData.vel.z,
    },
    ang: {
      x: inputData.ang.x,
      y: inputData.ang.y,
      z: inputData.ang.z,
    },
    counter: inputData.counter,
  };
};
